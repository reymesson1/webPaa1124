package co.cronoapp.myapplication.Model

import co.cronoapp.myapplication.Model.Master
import retrofit2.http.GET
import retrofit2.Call

interface MasterService{

    @GET("wallet")

    fun getMaster() : Call<List<Master>>

}