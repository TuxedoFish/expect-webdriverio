import { getExpectMessage, getReceived, getExpected} from '../../__fixtures__/utils';
import { toBeElementsArrayOfSize } from '../../../src/matchers/elements/toBeElementsArrayOfSize';

describe('toBeElementsArrayOfSize', () => {
    let els: WebdriverIO.ElementArray

    describe('success', () => {
        test('array of size 2', async () => {
            // Create an element array of length 2
            els = await $$('parent');
            const result = await toBeElementsArrayOfSize(els, 2, {});
            expect(result.pass).toBe(true)
        })  
        test('array of size 5', async () => {
            // Create an element array of length 2
            els = await $$('parent');
            // @ts-ignore
            els.parent._length = 5;
            const result = await toBeElementsArrayOfSize(els, 5, {});
            expect(result.pass).toBe(true)
        })  
    })

    describe('failure', () => {
        let result: any; 

        beforeEach(async () => {
            // Create an element array of length 2
            els = await $$('parent');
            result = await toBeElementsArrayOfSize(els, 5, {});
        })

        test('fails', () => {
            expect(result.pass).toBe(false)
        })

        describe('message shows correctly', () => {
            test('expect message', () => {
                expect(getExpectMessage(result.message())).toContain('to be elements array of size')
            })
            test('expected message', () => {
                expect(getExpected(result.message())).toContain('5')
            })
            test('received message', () => {
                expect(getReceived(result.message())).toContain('2')
            })
        })
    })

    describe('error catching', () => {
        test('throws error with incorrect size param', async () => {
            // Create an element array of length 2
            els = await $$('parent');
            let error;
            try {
                await toBeElementsArrayOfSize(els, "5")
            } catch (e) {
                error = e;
            }
            expect(error).toEqual(new Error('Invalid params passed to toBeElementsArrayOfSize.'));
        })
        it('works if size contains options', async () => {
            // Create an element array of length 2
            els = await $$('parent');
            let error;
            let result = await toBeElementsArrayOfSize(els, {lte: 5});
            expect(result.pass).toBe(true);
        })
        
    })
    
})
