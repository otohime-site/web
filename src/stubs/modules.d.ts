declare module "*.svg" {
  const content: any
  export default content
}

declare module "*.jpg" {
  const content: any
  export default content
}

declare module "*.module.css" {
  const classes: Record<string, string>
  export default classes
}

declare module "*.module.scss" {
  const classes: Record<string, string>
  export default classes
}
