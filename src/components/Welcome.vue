<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-md-12 text-center">
                <h1 >Examen COMIPEMS simulación</h1>
            </div>
            
        </div>
        <div class="row mb-5">
            <div class="col-md-12 text-center" v-for="(image,index) in images" :key="index">
                <img :src="imagePath(image)" alt="comuNA01" width="90%">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            images :[
                'comuNA01.png',
                'comuNA02.png',
                'comuNA03.png',
                'comuNA04.png',
                'comuNA05.png',
                'comuNA06.png',
                'comuNA07.png',
                'comuNA08.png',
                'comuNA09.png',
                'comuNA10.png',
            ]
        }
    },
    methods: {
        imagePath(name){
            return require(`../assets/${name}`)
        }
    }
}
</script>