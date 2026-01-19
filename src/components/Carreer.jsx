

const Carreer = () => (
  <section className='bg-black text-white flex items-center justify-center relative w-full min-h-screen p-4 font-montserrat font-black text-4xl sm:text-2xl md:text-4xl'>
    {/* Extra content after stack */}
    <div className="flex items-center justify-center text-3xl">
      <p>Keep scrolling — normal page continues here 👇</p>
    </div>
   
    <ScrollStack>
      <ScrollStackItem>
      <div class="card">
        
        <h2>Card 1</h2>
        <p>This is the first card in the stack</p>
      </div>
      </ScrollStackItem>
      <ScrollStackItem>
        <div class="card">
        
        <h2>Card 1</h2>
        <p>This is the first card in the stack</p>
      </div>
      </ScrollStackItem>
      <ScrollStackItem>
       <div class="card">
        
        <h2>Card 1</h2>
        <p>This is the first card in the stack</p>
      </div>
      </ScrollStackItem>
    </ScrollStack>

   
  </section>
)

export default Carreer
