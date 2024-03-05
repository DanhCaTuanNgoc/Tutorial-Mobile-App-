import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   FlatList,
   Image,
   Modal,
} from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { icons, SIZES, COLORS } from '../../../constants'

import styles from './welcome.style'

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
   const router = useRouter()
   const jobTypes = ['Full-time', 'Part-time', 'Contractor']
   const [activeJobType, setActiveJobType] = useState('Full-time')

   const [modalsVisivle, setModalsVisible] = useState(false)
   const openModal = () => {
      setModalsVisible(true)
   }
   const closeModal = () => {
      setModalsVisible(false)
   }
   return (
      <View>
         <View style={styles.container}>
            <Text style={styles.userName}> Hello Ngoc Tuan</Text>
            <Text style={styles.welcomeMessage}>Find your perfect job</Text>
         </View>
         <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
               <TextInput
                  style={styles.searchInput}
                  value={searchTerm}
                  onChangeText={(text) => {
                     setSearchTerm(text)
                  }}
                  placeholder="what are you looking for?"
                  placeholderTextColor={COLORS.gray2}
               />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
               <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={styles.searchBtnImage}
               />
            </TouchableOpacity>
         </View>
         <View style={styles.tabsContainer}>
            <FlatList
               data={jobTypes}
               renderItem={({ item }) => (
                  <TouchableOpacity
                     style={styles.tab(activeJobType, item)} // setting UI
                     onPress={() => {
                        setActiveJobType(item)
                        router.push(`/search/${item}`)
                     }}
                  >
                     <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                  </TouchableOpacity>
               )}
               keyExtractor={(item) => item}
               contentContainerStyle={{ columnGap: SIZES.small }}
               horizontal
            />
         </View>
         <View
            style={{
               paddingTop: 20,
            }}
         >
            <TouchableOpacity onPress={openModal}>
               <Text>Open Modal</Text>
            </TouchableOpacity>
            <Modal
               animationType="fade"
               visible={modalsVisivle}
               transparent={true}
               onRequestClose={closeModal}
            >
               <View
                  style={{
                     position: 'absolute',
                     top: '40%',
                     left: '33%',
                     width: 140,
                     height: 140,
                     backgroundColor: COLORS.gray,
                  }}
               >
                  <Text>This is a modal</Text>
                  <TouchableOpacity onPress={closeModal}>
                     <Text>Close this modal</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
         </View>
      </View>
   )
}

export default Welcome
