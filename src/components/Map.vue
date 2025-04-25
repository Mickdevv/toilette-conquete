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
const moonless_insta = "https://instagram.com/moonlessoff"
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between w-full p-4 banner">
      <a :href="moonless_insta" target="_blank"><img src="../assets/banner.png" alt="banner" height="50px"
          class="banner-img" /></a>

      <h1 class="title">
        Toilette conquete !
      </h1>

      <a :href="moonless_insta" target="_blank"><img src="../assets/banner.png" alt="banner" height="50px"
          class="banner-img" /></a>
    </div>

    <GoogleMap v-if="pins.length > 0" api-key="AIzaSyBLI1ll82HbVqPrmsxH0-2_ZgxJDl1XrQg" style="width: 100%; height:90vh"
      :center="center" :zoom="7">
      <Marker v-for="(marker, index) in pins" :key="index" :options="{ position: marker }"
        style="background-color: darkgrey;" @click="toggleInfoWindow(index)">
        <InfoWindow>
          <div style="max-width: 160px; color: black;">
            <img :src="marker.image" alt="Marker image" style="width: 100%; border-radius: 4px; height: 100%" />
            <p style="margin: 4px 0;">{{ marker.info }}</p>
            <a :href="'https://instagram.com/' + marker.insta" target="_blank"
              style="color: #1a73e8; text-decoration: underline;">
              @{{ marker.insta }}
            </a>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  </div>
</template>

<style>
.banner-img {
  height: 50px;

}

.title {
  display: flex;
  font-size: xx-large;
  font-weight: 700;
}

.banner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    justify-content: center;
  }
}
</style>