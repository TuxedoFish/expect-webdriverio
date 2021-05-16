import { waitUntil, enhanceError, compareStyle, executeCommand, wrapExpectedWithArray, updateElementsArray } from '../../utils'
import { runExpect } from '../../util/expectAdapter'

async function condition(el: WebdriverIO.Element, style: { [key: string]: string; }, options: ExpectWebdriverIO.StringOptions): Promise<any> {
    return compareStyle(el, style, options)
}

export function toHaveStyleFn(received: WebdriverIO.Element | WebdriverIO.ElementArray, style: { [key: string]: string; }, options: ExpectWebdriverIO.StringOptions = {}): any {
    const isNot = this.isNot
    const { expectation = 'style', verb = 'have' } = this

    return browser.call(async () => {
        let el = await received
        let actualStyle

        const pass = await waitUntil(async () => {
            const result = await executeCommand.call(this, el, condition, options, [style, options])
            el = result.el
            actualStyle = result.values

            return result.success
        }, isNot, options)

        updateElementsArray(pass, received, el)
        const message = enhanceError(el, wrapExpectedWithArray(el, actualStyle, style), actualStyle, this, verb, expectation, '', options)

        return {
            pass,
            message: (): string => message
        }
    })
}

export function toHaveStyle(...args: any): any {
    return runExpect.call(this, toHaveStyleFn, args)
}
