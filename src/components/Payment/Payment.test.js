import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Payment from './Payment';

Enzyme.configure({adapter: new Adapter()});

const checkoutFn = jest.fn();

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
        const component = shallow(
            <Payment name="payment test" />
        );
        expect(component).toMatchSnapshot();
        // const { enzymeWrapper } = setup();

        //assert JSX properties
        // expect(enzymeWrapper.find('div').first().hasClass('payment-container')).toBe(true);
    });
    it('Should checkout', () => {
        const component = shallow(<Payment checkout={checkoutFn} />)

        component
            .find('button')
            .simulate('click');
        
        expect(checkoutFn).toHaveBeenCalled();
    });
})
