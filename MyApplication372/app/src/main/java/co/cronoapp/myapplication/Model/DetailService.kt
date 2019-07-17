package co.cronoapp.myapplication.Model

import retrofit2.http.GET
import retrofit2.Call

interface DetailService{

    @GET("wallet")

    fun getDetail() : Call<List<Detail>>

}