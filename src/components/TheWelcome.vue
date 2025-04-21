<script setup>
import { ref } from 'vue'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

const center = { lat: 43.22208104771956, lng: -0.23202803141978387 }

const markers = [
  {
    lat: 43.22208104771956,
    lng: -0.23202803141978387,
    info: 'Marker 1 Info',
    // image: 'https://via.placeholder.com/100x60.png?text=Image+1',
    link: 'https://example.com/marker1',
  },
  {
    lat: 43.223,
    lng: -0.233,
    info: 'Marker 2 Info',
    // image: 'https://via.placeholder.com/100x60.png?text=Image+2',
    link: 'https://example.com/marker2',
  },
  {
    lat: 43.221,
    lng: -0.231,
    info: 'Marker 3 Info',
    // image: 'https://via.placeholder.com/100x60.png?text=Image+3',
    link: 'https://example.com/marker3',
  },
]

const activeMarkerIndex = ref(null)

function toggleInfoWindow(index) {
  console.log('Marker clicked:', index)
  activeMarkerIndex.value = activeMarkerIndex.value === index ? null : index
}</script>

<template>
  <div class="flex justify-center">
    <h1 class="flex justify-center text-center text-2xl font-bold m-4" style="text-align: center">&#127881;&#127881; !!!
      Toilette conquette
      !!!! &#127881;&#127881;</h1>
    <GoogleMap api-key="AIzaSyBLI1ll82HbVqPrmsxH0-2_ZgxJDl1XrQg" style="width: 100%; height:90vh" :center="center"
      :zoom="12">
      <Marker v-for="(marker, index) in markers" :key="index" :options="{ position: marker }"
        @hover="toggleInfoWindow(index)">
        <InfoWindow v-if="activeMarkerIndex === index">
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
