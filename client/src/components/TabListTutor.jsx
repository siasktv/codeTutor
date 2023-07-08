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
  SelectItem
} from '@tremor/react'

import { useState } from 'react'

import { UserGroupIcon, UserIcon } from '@heroicons/react/solid'
import TutorDashboardGraphbyMonth from './TutorDashboardGraphbyMonth'
import TutorDashboardGraphbyYear from './TutorDashboardGraphbyYear'
import TutorGainsGraphbyYear from './TutorGainsGraphbyYear'
import TutorGainsGraphbyMonth from './TutorGainsGraphbyMonth'

export const TabListTutor = props => {
  const { tutor, user } = props
  const [selectedTab, setSelectedTab] = useState('Ganancias')

  const handleTabChange = tab => {
    setSelectedTab(tab)
  }

  console.warn = () => {}

  return (
    <div className='flex justify-center max-lg:w-full'>
      <Card
        className='lg:w-4/5 my-8 w-full px-3'
        placeholder='Source Selection'
      >
        <Select value={selectedTab} onChange={handleTabChange}>
          <SelectItem value='Transacciones' className='cursor-pointer'>
            Transacciones
          </SelectItem>
          <SelectItem value='Ganancias' className='cursor-pointer'>
            Ganancias
          </SelectItem>
        </Select>
        {selectedTab === 'Transacciones' && (
          <TabGroup>
            <TabList className='' color='violet'>
              <Tab icon={UserGroupIcon}>Totales este mes</Tab>
              <Tab icon={UserIcon}>Totales este año</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TutorDashboardGraphbyMonth tutor={tutor} user={user} />
              </TabPanel>
              <TabPanel>
                <TutorDashboardGraphbyYear tutor={tutor} user={user} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        )}
        {selectedTab === 'Ganancias' && (
          <TabGroup>
            <TabList className='' color='violet'>
              <Tab icon={UserGroupIcon}>Totales este mes</Tab>
              <Tab icon={UserIcon}>Totales este año</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TutorGainsGraphbyMonth tutor={tutor} user={user} />
              </TabPanel>
              <TabPanel>
                <TutorGainsGraphbyYear tutor={tutor} user={user} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        )}
      </Card>
    </div>
  )
}

export default TabListTutor
