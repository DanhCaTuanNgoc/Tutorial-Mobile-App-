import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { SIZES, COLORS } from '../../../constants'
import useFetch from '../../../hook/useFetch'
import styles from './popularjobs.style'

const Popularjobs = () => {
   const router = useRouter()

   const { data, isLoading, error } = useFetch('search', {
      query: 'React developer',
      num_pages: 1,
   })

   const [selectedJob, setSelectedJob] = useState()

   const handleCardPress = (item) => {
      router.push(`/job-details/${item.job_id}`)
      setSelectedJob(item.job_id)
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Popularjobs</Text>
            <TouchableOpacity>
               <Text style={styles.headerBtn}>Show all</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.cardsContainer}>
            {isLoading ? (
               // sẽ có sự khác nhau về UI giữa adr và ios
               <ActivityIndicator size="large" colors={COLORS.primary} />
            ) : error ? (
               <Text>Something went wrong!!!</Text>
            ) : (
               <FlatList
                  data={data}
                  renderItem={({ item }) => (
                     <PopularJobCard
                        selectedJob={selectedJob}
                        handleCardPress={handleCardPress}
                        item={item}
                     />
                  )}
                  //
                  keyExtractor={(item) => item.job_id}
                  //?. là một toán tử an toàn để đảm bảo rằng nếu job_id không tồn tại (hoặc item không tồn tại), thì không có lỗi xảy ra.
                  contentContainerStyle={{ columnGap: SIZES.medium }}
                  horizontal
               />
            )}
         </View>
      </View>
   )
}

export default Popularjobs
