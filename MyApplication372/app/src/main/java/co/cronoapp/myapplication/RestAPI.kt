package co.cronoapp.myapplication

import android.util.Log
import co.cronoapp.myapplication.Model.*
import com.google.gson.Gson
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*

class RestAPI{

    var retrofit = Retrofit.Builder()
        .baseUrl("http://190.94.2.105:8083/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    var logged = "false"

    fun setMasterAPI(name:String, password:String){

        var newMaster = Master()
        newMaster.id = Date().time.toString()
        newMaster.date = Date().toString()
        newMaster.name = name
        newMaster.password = password

        var json = Gson().toJson(newMaster)

        var masterServicePost = retrofit.create(MasterServicePost::class.java)

        var call = masterServicePost.setMaster(JSONObject(json))

        call.enqueue(object : Callback<String>{
            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.i("error", t.toString())
            }

            override fun onResponse(call: Call<String>, response: Response<String>) {
                Log.i("response", response.body().toString())

                logged = response.body().toString()
            }
        })
    }

    fun getDetailAPI() : DetailService{

        return retrofit.create(DetailService::class.java)
    }

    fun setDetailAPI(name:String){

        var newDetail = Detail()
        newDetail.id = Date().time.toString()
        newDetail.date = Date().toString()
        newDetail.name = name

        var json = Gson().toJson(newDetail)

        var detailServicePost = retrofit.create(DetailServicePost::class.java)

        var call = detailServicePost.setDetail(JSONObject(json))

        call.enqueue(object : Callback<String>{
            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.i("error", t.toString())
            }

            override fun onResponse(call: Call<String>, response: Response<String>) {
                Log.i("response", response.body().toString())
            }

        })
    }

    fun editDetailAPI(id:String,name:String){

        var newDetail = Detail()
        newDetail.id = Date().time.toString()
        newDetail.date = Date().toString()
        newDetail.name = name

        var json = Gson().toJson(newDetail)

        var detailServiceEdit = retrofit.create(DetailServicePost::class.java)

        var call = detailServiceEdit.setDetail(JSONObject(json))

        call.enqueue(object : Callback<String>{
            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.i("error", t.toString())
            }

            override fun onResponse(call: Call<String>, response: Response<String>) {
                Log.i("response", response.body().toString())
            }


        })


    }

    fun deleteDetailAPI(id:String){

        var newDetail = Detail()
        newDetail.id = Date().time.toString()
        newDetail.date = Date().toString()

        var json = Gson().toJson(newDetail)

        var detailServiceDelete = retrofit.create(DetailServiceDelete::class.java)

        var call = detailServiceDelete.deleteDetail(JSONObject(json))

        call.enqueue(object : Callback<String>{
            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.i("error", t.toString())
            }

            override fun onResponse(call: Call<String>, response: Response<String>) {
                Log.i("response", response.body().toString())
            }


        })



    }


}