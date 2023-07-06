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
import AdminDashboardGraphbyMonth from './AdminDashboardGraphbyMonth'
import AdminDashboardGraphbyYear from './AdminDashboardGraphbyYear'
import AdminGainsGraphbyMonth from './AdminGainsGraphbyMonth'
import AdminGainsGraphbyYear from './AdminGainsGraphbyYear'

export const TabListAdmin = () => {
  const [selectedTab, setSelectedTab] = useState('Transacciones')

  const handleTabChange = tab => {
    setSelectedTab(tab)
  }

  console.warn = () => {}

  return (
    <div className='flex justify-center'>
      <Card className='lg:w-4/5 lg:my-8 my-4' placeholder='Source Selection'>
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
                <AdminDashboardGraphbyMonth />
              </TabPanel>
              <TabPanel>
                <AdminDashboardGraphbyYear />
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
                <AdminGainsGraphbyMonth />
              </TabPanel>
              <TabPanel>
                <AdminGainsGraphbyYear />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        )}
      </Card>
    </div>
  )
}

export default TabListAdmin
