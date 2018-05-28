import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Payment from './Payment';

Enzyme.configure({adapter: new Adapter()});

function setup() {
    const props = {
        checkout: jest.fn()
    }

    const enzymeWrapper = mount(<Payment {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Payment component', () => {
    it('Should render itself', () => {
        const { enzymeWrapper } = setup();

        //assert JSX properties
        expect(enzymeWrapper.find('div').first().hasClass('payment-container')).toBe(true);
    })
})
