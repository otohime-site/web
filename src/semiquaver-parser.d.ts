declare module 'semiquaver-parser/laundry' {
    const parser: (handler: (progress: number) => Promise<unknown>) => Promise<any>
    export default parser
}
declare module 'semiquaver-parser/laundry_dx' {
    const parser: (handler: (progress: number) => Promise<unknown>) => Promise<any>
    export default parser
}