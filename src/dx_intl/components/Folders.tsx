import { RadioGroup } from "@ark-ui/react/radio-group"
import { RadioGroupItem } from "../../common/components/ui/RadioGroupItem"
import { categories, levels, versions } from "../models/constants"

const Folder = () => {
  return (
    <div>
      <h4>Rating 組成</h4>
      <RadioGroup.Root>
        <RadioGroupItem value="true">新曲</RadioGroupItem>
        <RadioGroupItem value="false">舊曲</RadioGroupItem>
      </RadioGroup.Root>
      <h4>分類</h4>
      <RadioGroup.Root>
        {categories.map((category, index) =>
          category ? (
            <RadioGroupItem key={index} value={`${index}`}>
              {category}
            </RadioGroupItem>
          ) : undefined,
        )}
      </RadioGroup.Root>
      <h4>版本</h4>
      <RadioGroup.Root>
        {versions.map((version, index) => (
          <RadioGroupItem key={index} value={`${index}`}>
            {version}
          </RadioGroupItem>
        ))}
      </RadioGroup.Root>
      <h4>等級</h4>
      <RadioGroup.Root>
        {levels.map((level, index) => (
          <RadioGroupItem key={index} value={`${index}`}>
            Level {level}
          </RadioGroupItem>
        ))}
      </RadioGroup.Root>
      <h4>進階篩選</h4>
    </div>
  )
}

export default Folder
