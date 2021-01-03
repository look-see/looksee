/**
 * Quick, no-fuss wrapper for a logical unit of test code:
 *
 * 
 * ```javascript
 * test('<my-element></my-element> has a count of 1 after button click', () => {
 *    const component = document.getElementById('test-component-1');
 *    component.shadowRoot.querySelector('button').click();
 *    console.assert(component.count === 1, `Actual: ${component.count}`);
 * })
 * // Equivalent to the below standard, client-side javascript
 * document.addEventListener("DOMContentLoaded", () =>{
 *    // console.info() calls show up yellow in terminal
 *    console.info('<my-element></my-element> has a count of 1 after button click');
 *    const component = document.getElementById('test-component-1');
 *    component.shadowRoot.querySelector('button').click();
 *    console.assert(component.count === 1, `Actual: ${component.count}`);
 * });
 * // NOTE: The above event listener is needed to ensure #shadow-root is available.
 * ```
 */
export default function test(description:string, fn: () => void) {
  document.addEventListener("DOMContentLoaded", async () =>{
    console.info(description);  // console.info() calls show up yellow in terminal
    await fn();
  });
}