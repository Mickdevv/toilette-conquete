<script setup>
import { computed, ref, onMounted } from 'vue'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
// import { pins } from '@/assets/pins2'
import axios from 'axios';


const pins = ref([])
const activeMarkerIndex = ref(null)
const center = ref(avgLatLng(pins))

function avgLatLng(markers) {
  if (!markers.length) return { lat: 46.619082, lng: 2.457173 }
  const lat = markers.reduce((sum, marker) => sum + marker.lat, 0) / markers.length
  const lng = markers.reduce((sum, marker) => sum + marker.lng, 0) / markers.length
  return { lat, lng }
}


onMounted(async () => {
  try {
    const response = await axios.get('https://toilette-conquete.fr/static/pins.json')

    pins.value = response.data

    center.value = avgLatLng(pins.value)
  } catch (error) {
    console.error('Error fetching pins:', error)
  }
})

function toggleInfoWindow(index) {
  console.log('Marker clicked:', index)
  activeMarkerIndex.value = activeMarkerIndex.value === index ? null : index
}

</script>

<template>
  <div v-if="pins.length > 0" class="flex justify-center">
    <h1 class="flex justify-center text-center text-2xl font-bold m-4" style="text-align: center">&#127881;&#127881; !!!
      Toilette conquette
      !!!! &#127881;&#127881;</h1>
    <GoogleMap api-key="AIzaSyBLI1ll82HbVqPrmsxH0-2_ZgxJDl1XrQg" style="width: 100%; height:90vh" :center="center"
      :zoom="9">
      <Marker v-for="(marker, index) in pins" :key="index" :options="{ position: marker }"
        @click="toggleInfoWindow(index)">
        <InfoWindow>
          <div style="max-width: 160px">
            <!-- <img :src="marker.image" alt="Marker image" style="width: 100%; border-radius: 4px; height: 100%" /> -->
            <p style="margin: 4px 0;">{{ marker.info }}</p>
            <a :href="marker.link" target="_blank" style="color: #1a73e8; text-decoration: underline;">
              More Info
            </a>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  </div>
</template>
