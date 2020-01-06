import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}


// import React, { useState, useEffect } from 'react';

// export default function asyncComponent(importComponent) {
//     function AsyncComponent(props) {
//         const [component, setComponent] = useState(null);

//         useEffect(() => {
//             async function onLoad() {
//                 try {
//                     const component = await importComponent();
//                     console.log(component);
//                     setComponent(component);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             }
//             onLoad();
//         }, []);

//         const C = component;

//         return C ? <C {...props} /> : <div>loading</div>;
//     }
//     return AsyncComponent;
// }
