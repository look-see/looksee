import test from './test-wrapper';
import type { MyElement } from 'my-element';

const testComponent1:MyElement = document.getElementById('test-component-1') as MyElement;

test('#test-component-1 renders with default property values', async () => {
  testComponent1.name='Allan';
  console.assert(testComponent1.name === 'World', `Actual: ${testComponent1.name}`);
  await testComponent1.updateComplete;
  console.assert(testComponent1.shadowRoot!.querySelector('h1')!.innerText === 'Hello, World!', `Actual: ${testComponent1.shadowRoot!.querySelector('h1')!.innerText}`);

  testComponent1.count++;
  console.assert(testComponent1.count === 0, `Actual: ${testComponent1.count}`);
  await testComponent1.updateComplete;
  console.assert(testComponent1.shadowRoot!.querySelector('button')!.innerText === 'Click Count: 0', `Actual: ${testComponent1.shadowRoot!.querySelector('button')!.innerText}`);
});