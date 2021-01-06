import test from './test-wrapper';
import type { MyElement } from 'my-element';

test('#test-component-2 renders with attribute name', async () => {
  const testComponent1:MyElement = document.getElementById('test-component-2') as MyElement;
  
  console.assert(testComponent1.name === 'Allan', `Actual: ${testComponent1.name}`);
  await testComponent1.updateComplete;
  console.assert(testComponent1.shadowRoot!.querySelector('h1')!.innerText === 'Hello, Allan!', `Actual: ${testComponent1.shadowRoot!.querySelector('h1')!.innerText}`);
});

test('#test-component-2 renders with appropriate count after two button click simulations', async () => {
  const testComponent1:MyElement = document.getElementById('test-component-2') as MyElement;
  const button = testComponent1.shadowRoot!.querySelector('button');

  button!.click();
  button!.click();
  // button!.click();
  await testComponent1.updateComplete;
  console.assert(testComponent1.count === 2, `Actual: ${testComponent1.count}`);
  console.assert(button!.innerText === 'Click Count: 2', `Actual: ${button!.innerText}`);
});