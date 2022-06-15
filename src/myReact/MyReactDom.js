import react from 'react';

const render = (
    reactElement,
    domElement
) => {
    let curDom;
    console.log("TEST", reactElement)
    if (reactElement === undefined) {
        return;
    }
    if (typeof reactElement === 'string' || typeof reactElement === 'number') {
        curDom = document.createTextNode(reactElement);
        domElement.appendChild(curDom);
        return;
    } else {
        const { type, props } = reactElement;
        /// if type is ClassCompoennt
        if (type.prototype instanceof react.Component) {
            console.log('class componnent props', props)
            /// Mounting
            /// constructor
            const curInstance = new type(props);
            // console.log("curInstance", curInstance)

            // getDerivedStateFromProps
            curInstance.state = type.getDerivedStateFromProps(props, curInstance.state)
            // console.log("curInstance", curInstance)

            // render
            const curReactElement = curInstance.render();
            // console.log("curReactElement", curReactElement);
            render(curReactElement, domElement);
            if (curInstance.componentDidmount) {
                curInstance.componentDidmount()
            }
            return
        }
        else {
            // Assignment if it is function component
            curDom = type();
            if (curDom.$$typeof) {
                console.log("This is a functional compoenent!!!");
            }
            else return;
        }

        /// else
        const element = document.createElement(curDom.type);
        domElement.appendChild(element);
        Object.entries(curDom.props).forEach(
            ([key, value]) => {
                if (key === 'children') {
                    if (Array.isArray(value)) {
                        // console.log(value);
                        value.forEach((rElement) => {
                            render(rElement, element);
                        });
                    } else {
                        render(value, element);
                    }
                } else if (key.startsWith('on')) {
                    element.addEventListener(
                        getEventActionFromProps(key),
                        value
                    );
                } else {
                    element[key] = value;
                }
            }
        );
    }
};


//utils

function getEventActionFromProps(propsKey) {
    return propsKey.slice(2).toLowerCase();
}

const MyReactDOM = {
    render
}


export default MyReactDOM