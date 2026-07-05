import { Avatar as ArkAvatar } from "@ark-ui/react/avatar"
import { Ref } from "react"

import classes from "./Avatar.module.css"

interface AvatarProps extends ArkAvatar.RootProps {
  src?: string
  name?: string
  ref?: Ref<HTMLDivElement>
}

// Show the initial of the name (or a generic glyph) while the image loads or
// when there is no image URL.
const initial = (name?: string): string =>
  name && name.length > 0 ? Array.from(name)[0].toUpperCase() : "?"

export const Avatar = ({ src, name, ref, ...rest }: AvatarProps) => (
  <ArkAvatar.Root {...rest} ref={ref} className={classes["avatar"]}>
    <ArkAvatar.Fallback>{initial(name)}</ArkAvatar.Fallback>
    {src != null ? <ArkAvatar.Image src={src} alt={name ?? ""} /> : null}
  </ArkAvatar.Root>
)
