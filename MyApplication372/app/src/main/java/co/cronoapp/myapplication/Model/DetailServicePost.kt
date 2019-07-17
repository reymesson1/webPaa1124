package co.cronoapp.myapplication.Model

import org.json.JSONObject
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.Call

interface DetailServicePost{

    @POST("addwalletandroid")

    fun setDetail(@Body data : JSONObject) : Call<String>

}