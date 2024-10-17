package com.example.crimenet

import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import android.content.Intent
import android.widget.TextView

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        val sign_button = findViewById<Button>(R.id.signupbutton)
        sign_button.setOnClickListener {
            val Intent = Intent(this,SignUp::class.java)
            startActivity(Intent)
        }

        val signInText = findViewById<TextView>(R.id.textsignin)

        // Set an OnClickListener to open SignIn activity
        signInText.setOnClickListener {
            val intent2 = Intent(this, Login::class.java)
            startActivity(intent2)
        }
    }
}