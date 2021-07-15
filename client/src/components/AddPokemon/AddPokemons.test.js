import React from 'react';
import { render } from '@testing-library/react';
import AddPokemon from './AddPokemon';


test('First render AddPokemon, the label after contains Name', () => {
    const { container } = render(<AddPokemon/>)
    const element = container.querySelectorAll('label')[0]
    expect(element.innerHTML).toBe('Name:');
});

  it('The form has to contain one label with Type', () => {
    const { container } = render(<AddPokemon/>)
    const element = container.querySelectorAll('label')[1]
    expect(element.innerHTML).toBe('Type:');
  });


  it('The form has to contain input with name ', () => {
    const { container } = render(<AddPokemon/>)
    const element = container.querySelectorAll('input')[0]
    expect(element.type).toBe('text');
    expect(element.name).toBe('name');
  });

