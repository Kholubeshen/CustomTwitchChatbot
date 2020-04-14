
import React from "react";

//Tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-web-tabs';
import 'react-tabs/style/react-tabs.css';
import "react-web-tabs/dist/react-web-tabs.css";
import CommandsTable from '../src/scenes/chatCommands/components/commandsTable/commandsTable';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        //GET?
        fetch("http://localhost:9001/index")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    componentDidMount() {
        this.callAPI();
    }
    render() {
        return (
            <div className="App">
                <header>
                    <h1>Botillian (Header)</h1>
                </header>
                <Tabs defaultTab="vertical-tab-one" vertical className="vertical-tabs">
                    <TabList>
                        <Tab tabFor="vertical-tab-one">Custom Command</Tab>
                        <Tab tabFor="vertical-tab-two">Channel Points Redemptions</Tab>
                        <Tab tabFor="vertical-tab-three">Games</Tab>
                    </TabList>

                    <TabPanel tabId="vertical-tab-one">
                        <CommandsTable id='msg-commands-table'/>
                    </TabPanel>

                    <TabPanel tabId="vertical-tab-two">
                        <p>Tab content</p>
                    </TabPanel>

                    <TabPanel tabId="vertical-tab-three">
                        <p>Tab 3 content</p>
                    </TabPanel>
                </Tabs>
                <footer>
                    <h1>
                        Footer
                    </h1>
                </footer>
              
                <p>{this.state.apiResponse}</p>
            </div>
        );
    }
}
export default App;