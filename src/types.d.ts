declare module "*.svg" {
  const content: any
  export default content
}

declare module "@emotion/react" {
  export { Theme } from "@material-ui/core/styles"
}