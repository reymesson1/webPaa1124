package co.cronoapp.myapplication

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*
import org.jetbrains.anko.activityUiThread
import org.jetbrains.anko.doAsync

class MainActivity : AppCompatActivity() {

    var rest = RestAPI()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        doAsync {

            activityUiThread {

                Thread.sleep(2000)
            }
        }

        btn_login.setOnClickListener {

            rest.setMasterAPI(editTXT.text.toString(), editTXT2.text.toString())

            if(rest.logged=="true"){
                var intent = Intent(this@MainActivity, Main2Activity::class.java)
                startActivity(intent)
            }else{
                Toast.makeText(this,"User and Password incorrect", Toast.LENGTH_LONG).show()
            }
        }
    }
}
