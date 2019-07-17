package co.cronoapp.myapplication.Model

import org.json.JSONObject
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.Call

interface MasterServicePost{

    @POST("loginandroid")

    fun setMaster(@Body data : JSONObject) : Call<String>

}