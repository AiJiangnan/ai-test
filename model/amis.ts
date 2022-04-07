export class R {
    public status: number = 0
    public msg?: string
    public data?: any

    constructor(data: any) {
        this.data = data
    }

    public static ok(data?: any): R {
        return new R(data)
    }
}