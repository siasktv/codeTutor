import {
    ProgressBar,
    Card,
    Flex,
    Text,
    Metric,
    TabList,
    Tab,
    TabGroup,
    TabPanels,
    TabPanel,
    Select,
    SelectItem,
  } from "@tremor/react";
  
  import { useState } from "react";
  
  import { UserGroupIcon, UserIcon } from "@heroicons/react/solid";
  import TutorDashboardGraphbyMonth from "./TutorDashboardGraphbyMonth";
  import TutorDashboardGraphbyYear from "./TutorDashboardGraphbyYear";
  import TutorGainsGraphbyYear from "./TutorGainsGraphbyYear";
  import TutorGainsGraphbyMonth from "./TutorGainsGraphbyMonth";
  
  export const TabListTutor = () => {
    const [selectedTab, setSelectedTab] = useState("Ganancias");
  
    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };

    console.warn = () => {};
  
    return (
      <div className="flex justify-center">
        <Card className="w-4/5 my-8" placeholder="Source Selection">
          <Select value={selectedTab} onChange={handleTabChange}>
            <SelectItem value="Transacciones">Transacciones</SelectItem>
            <SelectItem value="Ganancias">Ganancias</SelectItem>
          </Select>
          {selectedTab === "Transacciones" && (
            <TabGroup>
              <TabList className="" color="violet">
                <Tab icon={UserGroupIcon}>
                  Transacciones totales este mes
                </Tab>
                <Tab icon={UserIcon}>Transacciones totales este año</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TutorDashboardGraphbyMonth />
                </TabPanel>
                <TabPanel>
                  <TutorDashboardGraphbyYear />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          )}
          {selectedTab === "Ganancias" && (
            <TabGroup>
              <TabList className="" color="violet">
                <Tab icon={UserGroupIcon}>Ganancias totales este mes</Tab>
                <Tab icon={UserIcon}>Ganancias totales este año</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TutorGainsGraphbyMonth />
                </TabPanel>
                <TabPanel>
                  <TutorGainsGraphbyYear />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          )}
        </Card>
      </div>
    );
  };
  
  export default TabListTutor;
  