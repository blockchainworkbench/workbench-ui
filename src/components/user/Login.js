import React from 'react';
import TitleHeader from "../layout/TitleHeader";
import ExerciseElement from "../page/elements/ExerciseElement";

class Login extends React.Component {

    render() {
        const content = {
            title: 'Test Code Editor',
            description: 'It looks like `SpaceMuffin` had a secret recipe. Expose it to the world!',
            initial: `pragma solidity ^0.4.24;\n\ncontract SpacecryptFactory {
        \n  uint public timeout = 60;\n  uint public halfway = timeout / 2;
        \n\n  bytes32 public name = 'SuperCryptor 2000';\n\n  // Get some inspiration from what is done here
        \n  function getHalfway() external view returns (uint) {\n    return halfway;\n  }
        \n\n  // Add getName() here\n\n}`
        };

        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            Login
                        </h1>

                        <ExerciseElement content={content}/>
                    </div>
                </div>
            </section>
        )
    }
}

export default Login;