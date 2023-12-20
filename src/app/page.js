
export default function Home() {
<<<<<<< HEAD
=======
  const {showNotify,ToastContainer} = toastNotify();

  useEffect(()=>{
    var toastMessage = localStorage.getItem('ToasNotify');


    if (toastMessage) {
      const toastParse = JSON.parse(toastMessage);
      showNotify(toastParse.type,toastParse.message)
      localStorage.removeItem('ToasNotify');
    }

  },[showNotify]);


>>>>>>> 4cd9854ebfab1a4c951472b2054afa15b6c931ad
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>HOLA MUNDO</h1>
    </main>
  )
}
