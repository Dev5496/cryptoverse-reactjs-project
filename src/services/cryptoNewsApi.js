import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    'x-rapidapi-key': '8a8e386c7amsh5c68e385eac13afp1c3bf8jsn05515444c2cc',
    'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
}

const baseUrl = 'https://real-time-news-data.p.rapidapi.com/search' ;

const createRequest = (url) => ({url, headers: cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`?query=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const {useGetCryptoNewsQuery} = cryptoNewsApi;