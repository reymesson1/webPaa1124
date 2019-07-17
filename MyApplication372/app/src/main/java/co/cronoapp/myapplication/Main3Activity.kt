package co.cronoapp.myapplication

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.DialogInterface
import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.app.AlertDialog
import android.util.Log
import android.widget.Toast
import co.cronoapp.myapplication.Model.Detail
import kotlinx.android.synthetic.main.activity_main.view.*
import kotlinx.android.synthetic.main.activity_main3.*
import kotlinx.android.synthetic.main.activity_main3.view.*
import kotlinx.android.synthetic.main.layout_item.view.*
import org.jetbrains.anko.activityUiThread
import org.jetbrains.anko.doAsync
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.*

class Main3Activity : AppCompatActivity() {

    var rest = RestAPI()
    var c = Calendar.getInstance()
    var year = c.get(Calendar.YEAR)
    var month = c.get(Calendar.MONTH)
    var days = c.get(Calendar.DAY_OF_MONTH)
    var hour = c.get(Calendar.HOUR)
    var minute = c.get(Calendar.MINUTE)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main3)

        doAsync {

            activityUiThread {

                Thread.sleep(2000)

                getData()
            }
        }

        btn_add.setOnClickListener {

            var alertDialog = AlertDialog.Builder(this@Main3Activity)

            var modal = layoutInflater.inflate(R.layout.layout_add, null)

            var dpd = DatePickerDialog(this@Main3Activity, DatePickerDialog.OnDateSetListener { view, year, month, dayOfMonth ->

                modal.editTXT.setText(""+year+"-"+month+"-"+days)
            }, year, month, days)

            modal.editTXT.setOnClickListener{

                dpd.show()
            }

            var ipd = TimePickerDialog(this@Main3Activity, TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->

                modal.editTXT2.setText(""+hour+":"+minute)

            } , hour, minute,true)

            modal.editTXT2.setOnClickListener{

                ipd.show()
            }

            alertDialog.setTitle("Add New Title")

            alertDialog.setView(modal)

            alertDialog.setPositiveButton("Save", DialogInterface.OnClickListener { dialog, which ->

                rest.setDetailAPI(modal.editTXT.text.toString() + " " + modal.editTXT2.text.toString())
                var intent = Intent(this@Main3Activity, Main3Activity::class.java)
                startActivity(intent)
            })

            alertDialog.show()

        }

    }

    fun getData(){

        var masterService = rest.getDetailAPI()

        var call = masterService.getDetail()

        call.enqueue(object : Callback<List<Detail>> {
            override fun onFailure(call: Call<List<Detail>>, t: Throwable) {
                Log.i("error", t.toString())
            }

            override fun onResponse(call: Call<List<Detail>>, response: Response<List<Detail>>) {

//                Toast.makeText(this@Main3Activity, response.body().toString().length, Toast.LENGTH_LONG).show()

                response.body()!!.forEach {at ->

                    var item = layoutInflater.inflate(R.layout.layout_item, null)

                    item.nameTXT.setText(at.name)

                    item.btn_delete.setOnClickListener {

                        rest.deleteDetailAPI(at.id)
                        var intent = Intent(this@Main3Activity, Main3Activity::class.java)
                        startActivity(intent)
                    }

                    item.btn_edit.setOnClickListener {

                        var alertDialog = AlertDialog.Builder(this@Main3Activity)

                        var modal = layoutInflater.inflate(R.layout.layout_add, null)

                        var dpd = DatePickerDialog(this@Main3Activity, DatePickerDialog.OnDateSetListener { view, year, month, dayOfMonth ->

                            modal.editTXT.setText(""+year+"-"+month+"-"+days)
                        }, year, month, days)

                        modal.editTXT.setOnClickListener{

                            dpd.show()
                        }

                        var ipd = TimePickerDialog(this@Main3Activity, TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->

                            modal.editTXT2.setText(""+hour+":"+minute)

                        } , hour, minute,true)

                        modal.editTXT2.setOnClickListener{

                            ipd.show()
                        }

                        alertDialog.setTitle("Edit Title")

                        modal.editTXT.setText(at.name)

                        alertDialog.setView(modal)

                        alertDialog.setPositiveButton("Save", DialogInterface.OnClickListener { dialog, which ->

                            rest.setDetailAPI(modal.editTXT.text.toString() + " " + modal.editTXT2.text.toString())
                            var intent = Intent(this@Main3Activity, Main3Activity::class.java)
                            startActivity(intent)
                        })

                        alertDialog.show()

                    }

                    scContent.addView(item)

                }

            }


        })

    }
}