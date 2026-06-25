import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import React from 'react';

export async function compileMDX(source: string) {
  try {
    // evaluate the mdx string to a react component
    // We pass the runtime which contains jsx, jsxs, and Fragment
    const { default: MDXContent } = await evaluate(source, {
      ...(runtime as any),
      development: false
    });
    
    return MDXContent;
  } catch (error) {
    console.error("Error compiling MDX:", error);
    // Return a fallback component
    return () => React.createElement('div', { style: { color: 'red' } }, 'Error rendering entry content.');
  }
}
