declare module 'semiquaver-parser/laundry' {
    const parser: (handler: (progress: number) => Promise<{}>) => Promise<any>
    export default parser
}