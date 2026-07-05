import { Menu as ArkMenu } from "@ark-ui/react/menu"
import { ReactNode } from "react"

import classes from "./Menu.module.css"

export interface MenuItem {
  value: string
  label: ReactNode
  onSelect?: () => void
  disabled?: boolean
}

interface MenuProps extends ArkMenu.RootProps {
  trigger: ReactNode
  items: MenuItem[]
}

// A trigger that opens a dropdown of selectable items, styled through
// Menu.module.css. Consumers pass their own trigger content (e.g. an avatar)
// and a flat list of items; selecting one fires its onSelect.
export const Menu = ({ trigger, items, ...rest }: MenuProps) => (
  <ArkMenu.Root
    {...rest}
    onSelect={({ value }) => {
      items.find((item) => item.value === value)?.onSelect?.()
    }}
  >
    <ArkMenu.Trigger className={classes["trigger"]}>{trigger}</ArkMenu.Trigger>
    <ArkMenu.Positioner>
      <ArkMenu.Content className={classes["content"]}>
        {items.map((item) => (
          <ArkMenu.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={classes["item"]}
          >
            {item.label}
          </ArkMenu.Item>
        ))}
      </ArkMenu.Content>
    </ArkMenu.Positioner>
  </ArkMenu.Root>
)
