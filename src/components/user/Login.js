import React from 'react';
import TitleHeader from "../layout/TitleHeader";
import CodeExercise from "../page/CodeExercise";

class Login extends React.Component {

    handleCodeSubmit(code) {
        console.log('Code submitted');
    }

    render() {
        const description = 'It looks like `SpaceMuffin` had a secret recipe. Expose it to the world!';
        const content = `pragma solidity ^0.4.24;\n\ncontract SpacecryptFactory {
        \n  uint public timeout = 60;\n  uint public halfway = timeout / 2;
        \n\n  bytes32 public name = 'SuperCryptor 2000';\n\n  // Get some inspiration from what is done here
        \n  function getHalfway() external view returns (uint) {\n    return halfway;\n  }
        \n\n  // Add getName() here\n\n}`;
        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            Login
                        </h1>

                        <CodeExercise title='Test Code Editor'
                                      description={description}
                                      content={content}
                                      onSubmit={this.handleCodeSubmit}
                        />
                    </div>
                </div>
            </section>
        )
    }
}

export default Login;