import { useState } from "react";
import { profile } from "../config/profile";

export default function Contact() {

const { contactFormUrl } = profile;

const [sent,setSent]=useState(false);

const handleSubmit = async (e)=>{

e.preventDefault();

const formData = new FormData(e.target);

try{

await fetch(contactFormUrl,{
method:"POST",
body:formData,
headers:{Accept:"application/json"}
});

setSent(true);
e.target.reset();

}catch(err){

alert("Something went wrong");

}

};

return(

<section
id="contact"
style={{
padding:"5.5rem 7% 6.5rem",
background:"#020617"
}}
>

<div style={{ textAlign:"center", marginBottom:"3rem" }}>

<div style={{
fontSize:"0.68rem",
fontWeight:700,
letterSpacing:"3.5px",
color:"#6366f1",
marginBottom:10,
textTransform:"uppercase"
}}>

Hire Me

</div>

<h2 style={{
fontFamily:"'Syne',sans-serif",
fontSize:"clamp(1.9rem,4vw,2.6rem)",
fontWeight:800,
color:"white",
marginBottom:10
}}>

Get In Touch

</h2>

<p style={{
color:"rgba(226,232,240,0.42)",
fontSize:"0.92rem",
maxWidth:420,
margin:"0 auto",
lineHeight:1.7
}}>

Actively looking for new opportunities. My inbox is always open!

</p>

</div>


<div style={{ maxWidth:580, margin:"0 auto" }}>

{sent ? (

<div style={{
textAlign:"center",
padding:"3rem",
background:"rgba(34,197,94,0.08)",
border:"1px solid rgba(34,197,94,0.25)",
borderRadius:18
}}>

<div style={{ fontSize:"3rem", marginBottom:12 }}>✅</div>

<h3 style={{
fontFamily:"'Syne',sans-serif",
color:"white",
fontWeight:800,
marginBottom:8
}}>

Message Sent!

</h3>

<p style={{
color:"rgba(226,232,240,0.5)",
fontSize:"0.9rem"
}}>

Thanks for reaching out. I'll get back to you soon.

</p>

<button
onClick={()=>setSent(false)}
style={{
marginTop:20,
background:"transparent",
border:"1px solid rgba(34,197,94,0.3)",
color:"rgba(34,197,94,0.8)",
borderRadius:9,
padding:"8px 22px",
fontSize:"0.83rem",
cursor:"pointer",
fontWeight:600
}}
>

Send Another

</button>

</div>

):( 

<form onSubmit={handleSubmit}>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"1rem",
marginBottom:"1rem"
}}>

<div>

<label style={{
display:"block",
fontSize:"0.76rem",
fontWeight:700,
color:"rgba(226,232,240,0.38)",
marginBottom:6
}}>

👤 Name

</label>

<input
type="text"
name="name"
placeholder="Full Name"
required
style={{
width:"100%",
background:"rgba(255,255,255,0.04)",
border:"1px solid rgba(99,102,241,0.2)",
borderRadius:11,
padding:"0.75rem 1rem",
color:"white"
}}
/>

</div>

<div>

<label style={{
display:"block",
fontSize:"0.76rem",
fontWeight:700,
color:"rgba(226,232,240,0.38)",
marginBottom:6
}}>

✉️ Email

</label>

<input
type="email"
name="email"
placeholder="your@email.com"
required
style={{
width:"100%",
background:"rgba(255,255,255,0.04)",
border:"1px solid rgba(99,102,241,0.2)",
borderRadius:11,
padding:"0.75rem 1rem",
color:"white"
}}
/>

</div>

</div>

<div style={{ marginBottom:"1.2rem" }}>

<label style={{
display:"block",
fontSize:"0.76rem",
fontWeight:700,
color:"rgba(226,232,240,0.38)",
marginBottom:6
}}>

💬 Message

</label>

<textarea
name="message"
rows={5}
placeholder="Hello Tushar, I'd like to work with you..."
required
style={{
width:"100%",
background:"rgba(255,255,255,0.04)",
border:"1px solid rgba(99,102,241,0.2)",
borderRadius:11,
padding:"0.75rem 1rem",
color:"white",
resize:"none"
}}
/>

</div>

<div style={{ display:"flex", justifyContent:"flex-end" }}>

<button
type="submit"
style={{
background:"linear-gradient(135deg,#6366f1,#818cf8)",
color:"white",
border:"none",
borderRadius:11,
padding:"0.85rem 2.6rem",
fontSize:"0.92rem",
fontWeight:700,
cursor:"pointer",
boxShadow:"0 0 22px rgba(99,102,241,0.38)"
}}
>

Send Message →

</button>

</div>

</form>

)}

</div>


{/* SOCIAL LINKS */}

<div className="contact-social-row">

<a
href="https://github.com/tushar-singhal736"
target="_blank"
rel="noopener noreferrer"
className="contact-social-link"
>

<i className="fab fa-github"></i>

</a>

<a
href="https://www.linkedin.com/in/tushar-singhal-a51a40339/"
target="_blank"
rel="noopener noreferrer"
className="contact-social-link"
>

<i className="fab fa-linkedin-in"></i>

</a>

</div>

</section>

);

}