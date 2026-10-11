import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import clsx from "clsx"
import { createParser, useQueryStates } from "nuqs"
import { useCallback, useMemo, useState } from "react"
import { useQuery } from "urql"
import { Link } from "wouter"
import IconClose from "~icons/mdi/close"
import IconFolder from "~icons/mdi/folder"
import IconMagnify from "~icons/mdi/magnify"
import { PageMeta } from "../../common/components/PageMeta"
import { QueryResult } from "../../common/components/QueryResult"
import { Switch } from "../../common/components/ui/Switch"
import Folders from "../components/Folders"
import folderClasses from "../components/Folders.module.css"
import Variant from "../components/Variant"
import { flatSongsResult, getCoverUrl } from "../models/aggregation"
import {
  type Difficulty,
  categories,
  difficultyShortNames,
  versions,
} from "../models/constants"
import {
  ScoreFilter,
  filterEntry,
  getFilterTitle,
  matchesSongSearch,
} from "../models/filter"
import {
  FolderQuery,
  getFolderFilter,
  getFolderQuery,
  isFolderValue,
} from "../models/folders"
import { dxIntlSongsDocument } from "../models/queries"
import playerClasses from "./Player.module.css"
import scoresClasses from "./PlayerScores.module.css"
import classes from "./StatsSongs.module.css"

type ChartEntry = ReturnType<typeof flatSongsResult>[number]

// One card per variant (STANDARD/DELUXE), as each has its own version and
// stats page.
interface SongVariant {
  key: string
  song_id: string
  title: string
  artist: string
  category: number
  version: number
  deluxe: boolean
  active: boolean
  charts: ChartEntry[]
}

const DEFAULT_FOLDER: FolderQuery = "all"

// The rating folders and advanced filters only make sense with scores.
const songsFolderParser = createParser<FolderQuery>({
  parse: (value) =>
    isFolderValue(value) && !value.startsWith("rating-") && value !== "filters"
      ? value
      : null,
  serialize: String,
}).withDefault(DEFAULT_FOLDER)

const searchParser = createParser<string>({
  parse: (value) => (value.trim() === "" ? null : value),
  serialize: String,
}).withDefault("")

const songsQueryParsers = {
  folder: songsFolderParser,
  search: searchParser,
}

const getVariantKey = (entry: Pick<ChartEntry, "song_id" | "deluxe">) =>
  `${entry.song_id}_${entry.deluxe ? "dx" : "std"}`

const groupVariants = (entries: ChartEntry[]): SongVariant[] => {
  const variants = new Map<string, SongVariant>()
  for (const entry of entries) {
    const key = getVariantKey(entry)
    const variant = variants.get(key)
    if (variant != null) {
      variant.charts.push(entry)
      continue
    }
    variants.set(key, {
      key,
      song_id: entry.song_id,
      title: entry.title,
      artist: entry.artist,
      category: entry.category,
      version: entry.version,
      deluxe: entry.deluxe,
      active: entry.active,
      charts: [entry],
    })
  }
  return [...variants.values()]
}

const SongCard = ({
  variant,
  filter,
}: {
  variant: SongVariant
  filter: ScoreFilter
}) => {
  // Level folders pick charts rather than songs; dim the other charts.
  const levelFolder = filter.level.length > 0
  return (
    <Link
      className={clsx(classes.card, !variant.active && classes.inactive)}
      href={`~/dxi/s/${variant.song_id.substring(0, 8)}/${variant.deluxe ? "dx" : "std"}`}
    >
      <div className={classes.header}>
        <img
          className={classes.cover}
          src={getCoverUrl(variant.song_id)}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className={classes.info}>
          <span className={classes.title} title={variant.title}>
            {variant.title}
          </span>
          <span className={classes.artist} title={variant.artist}>
            {variant.artist}
          </span>
          <span className={classes.meta}>
            <Variant deluxe={variant.deluxe} />
            <span>{categories[variant.category]}</span>
            <span>{versions[variant.version]}</span>
          </span>
        </div>
      </div>
      <span className={classes.charts}>
        {variant.charts.map((chart) => (
          <span
            key={chart.difficulty}
            className={clsx(
              classes.chart,
              folderClasses[`difficulty-${chart.difficulty as Difficulty}`],
              levelFolder && !filterEntry(chart, filter) && classes.dimmed,
            )}
          >
            <span className={classes.difficulty}>
              {difficultyShortNames[chart.difficulty]}
            </span>
            <span
              className={clsx(
                classes.level,
                chart.internal_lv == null && classes.estimated,
              )}
            >
              {chart.internal_lv?.toFixed(1) ?? chart.level}
            </span>
          </span>
        ))}
      </span>
    </Link>
  )
}

const StatsSongs = () => {
  const [songsResult] = useQuery({ query: dxIntlSongsDocument })
  const [{ folder, search }, setSongsQuery] = useQueryStates(songsQueryParsers)
  const [includeInactive, setIncludeInactive] = useState(false)
  const [foldersOpen, setFoldersOpen] = useState(false)

  const charts = useMemo(
    () =>
      flatSongsResult(songsResult.data).filter(
        (entry) => includeInactive || entry.active,
      ),
    [songsResult.data, includeInactive],
  )
  const variants = useMemo(() => groupVariants(charts), [charts])
  const maxVersion = useMemo(
    () => Math.max(...charts.map((entry) => entry.version)),
    [charts],
  )
  const filter = useMemo(() => getFolderFilter(folder, null), [folder])
  const listedVariants = useMemo(
    () =>
      variants.filter(
        (variant) =>
          matchesSongSearch(variant, search) &&
          variant.charts.some((chart) => filterEntry(chart, filter)),
      ),
    [filter, search, variants],
  )
  const filterTitle = getFilterTitle(filter)

  const handleFolderChange = useCallback(
    (nextFilter: ScoreFilter) => {
      void setSongsQuery({
        folder: getFolderQuery(nextFilter, DEFAULT_FOLDER),
      })
      setFoldersOpen(false)
    },
    [setSongsQuery],
  )

  return (
    <>
      <PageMeta
        canonicalPath="/dxi/s"
        description="瀏覽 maimai DX 國際版所有樂曲的分類、版本與各難易度譜面定數，並查看各譜面的玩家統計。"
        title="樂曲列表 - maimai DX 樂曲統計 - Otohime"
      />
      <div className={classes.toolbar}>
        <Dialog.Root
          lazyMount
          unmountOnExit
          open={foldersOpen}
          onOpenChange={({ open }) => setFoldersOpen(open)}
        >
          <Dialog.Trigger asChild>
            <button className={playerClasses["folders-trigger"]}>
              <IconFolder />
              <span className={playerClasses["filter-label"]}>篩選</span>
              <span
                className={playerClasses["filter-summary"]}
                title={filterTitle}
              >
                {filterTitle}
              </span>
              <span
                className={playerClasses["filter-count"]}
                title={`${listedVariants.length} 樂曲`}
              >
                {listedVariants.length}
              </span>
            </button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content className={playerClasses["folders-dialog"]}>
                <div className={playerClasses["folders-dialog-header"]}>
                  <Dialog.Title>資料夾篩選</Dialog.Title>
                  <button
                    disabled={folder === DEFAULT_FOLDER}
                    onClick={() => {
                      void setSongsQuery({ folder: null })
                      setFoldersOpen(false)
                    }}
                  >
                    全曲
                  </button>
                  <Dialog.CloseTrigger asChild>
                    <button aria-label="關閉">
                      <IconClose />
                    </button>
                  </Dialog.CloseTrigger>
                </div>
                <Folders
                  entries={charts}
                  filter={filter}
                  difficulty={null}
                  maxVersion={maxVersion}
                  ratingFolders={false}
                  getCountKey={getVariantKey}
                  onFilterChange={handleFolderChange}
                />
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <label className={scoresClasses["song-search"]}>
          <IconMagnify aria-hidden />
          <input
            type="search"
            aria-label="搜尋歌曲名稱或演出者"
            placeholder="搜尋歌曲名稱或演出者"
            value={search}
            onChange={(event) => {
              const nextSearch = event.currentTarget.value
              void setSongsQuery(
                { search: nextSearch.trim() === "" ? null : nextSearch },
                { history: "replace" },
              )
            }}
          />
        </label>
        <Switch
          checked={includeInactive}
          onCheckedChange={({ checked }) => setIncludeInactive(checked)}
        >
          顯示已刪除樂曲
        </Switch>
      </div>
      <QueryResult result={songsResult}>
        <ul className={classes.cards}>
          {listedVariants.map((variant) => (
            <li key={variant.key}>
              <SongCard variant={variant} filter={filter} />
            </li>
          ))}
        </ul>
      </QueryResult>
    </>
  )
}

export default StatsSongs
