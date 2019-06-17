<template>
    <div>
        <h1>test</h1>
        <b-table striped borderless responsive hover :items="listData" :fields="fields"></b-table>
        <h1>test2</h1>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            fields: [
                {
                    key: 'rank',
                    label: 'Ранг',
                    sortable: false
                },
                {
                    key: 'name',
                    label: 'Название',
                    sortable: true
                },
                {
                    key: 'priceUsd',
                    label: 'Стоимость',
                    sortable: true
                },
                {
                    key: 'marketCapUsd',
                    label: 'Рыночная капитализация',
                    sortable: true
                },
                {
                    key: 'volumeUsd24Hr',
                    label: 'Суточный объем',
                    sortable: true
                },
            ],
            listData: []
        }
    },
    methods:{
        ...mapActions({
            getApiData: 'mainPage/getApiData'
        }),
        getWebSocket(){
            let ws = new WebSocket("wss://ws.coincap.io/trades/binance");
            ws.onmessage = ({data}) => {
                let parseData = JSON.parse(data)
                if(parseData.priceUsd)
                    this.listData.find(el => el.id === parseData.base).priceUsd = parseData.priceUsd > 1 ? '$'+parseData.priceUsd.toFixed(2) : '$'+parseData.priceUsd.toFixed(6)
            }
            
        }
    },
    created(){
        this.getApiData().then(res => {
            this.listData = res.data.data
        }).then(() => {
            this.listData.forEach(el => {
                el.volumeUsd24Hr = '$'+Number(el.volumeUsd24Hr).toFixed()
                el.marketCapUsd = '$'+Number(el.marketCapUsd).toFixed()
                el.priceUsd = Number(el.priceUsd >= 1) ? '$'+Number(el.priceUsd).toFixed(2) : '$'+Number(el.priceUsd).toFixed(6)
            })
            this.getWebSocket()
        })
    }
}
</script>
<style>

</style>

