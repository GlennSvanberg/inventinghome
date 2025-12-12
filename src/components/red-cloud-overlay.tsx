export function RedCloudOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Multiple cloud layers - smaller clouds with distinct boundaries */}
      <div className="absolute inset-0">
        {/* Dense cloud cluster 1 - top left */}
        <div 
          className="absolute w-[500px] h-[400px] bg-red-500/5 rounded-full blur-[70px]"
          style={{
            top: '8%',
            left: '-150px',
            animation: 'cloudDrift1 50s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[350px] h-[300px] bg-red-600/4 rounded-full blur-[60px]"
          style={{
            top: '12%',
            left: '5%',
            animation: 'cloudDrift1 50s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
        
        {/* Clear area - top right */}
        <div 
          className="absolute w-[300px] h-[250px] bg-red-400/1 rounded-full blur-[120px]"
          style={{
            top: '10%',
            right: '15%',
            animation: 'cloudDrift2 55s ease-in-out infinite',
          }}
        />
        
        {/* Dense cloud cluster 2 - center left */}
        <div 
          className="absolute w-[450px] h-[380px] bg-red-500/5 rounded-full blur-[65px]"
          style={{
            top: '38%',
            left: '-120px',
            animation: 'cloudDrift3 45s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[320px] h-[280px] bg-red-600/4 rounded-full blur-[55px]"
          style={{
            top: '42%',
            left: '18%',
            animation: 'cloudDrift3 45s ease-in-out infinite',
            animationDelay: '1.5s',
          }}
        />
        
        {/* Clear area - center */}
        <div 
          className="absolute w-[280px] h-[240px] bg-red-400/1 rounded-full blur-[150px]"
          style={{
            top: '45%',
            left: '50%',
            animation: 'cloudDrift4 60s ease-in-out infinite',
          }}
        />
        
        {/* Dense cloud cluster 3 - bottom right */}
        <div 
          className="absolute w-[480px] h-[400px] bg-red-600/5 rounded-full blur-[68px]"
          style={{
            bottom: '12%',
            right: '-180px',
            animation: 'cloudDrift5 48s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[340px] h-[300px] bg-red-500/4 rounded-full blur-[58px]"
          style={{
            bottom: '18%',
            right: '8%',
            animation: 'cloudDrift5 48s ease-in-out infinite',
            animationDelay: '2.5s',
          }}
        />
        
        {/* Medium density cloud - top center */}
        <div 
          className="absolute w-[380px] h-[320px] bg-red-500/3 rounded-full blur-[90px]"
          style={{
            top: '22%',
            left: '35%',
            animation: 'cloudDrift6 52s ease-in-out infinite',
          }}
        />
        
        {/* Clear area - bottom left */}
        <div 
          className="absolute w-[300px] h-[260px] bg-red-400/1 rounded-full blur-[130px]"
          style={{
            bottom: '28%',
            left: '8%',
            animation: 'cloudDrift7 58s ease-in-out infinite',
          }}
        />
        
        {/* Dense cloud cluster 4 - middle right */}
        <div 
          className="absolute w-[420px] h-[360px] bg-red-600/5 rounded-full blur-[72px]"
          style={{
            top: '52%',
            right: '-100px',
            animation: 'cloudDrift8 47s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[310px] h-[270px] bg-red-500/4 rounded-full blur-[62px]"
          style={{
            top: '56%',
            right: '22%',
            animation: 'cloudDrift8 47s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
        
        {/* Very sparse cloud - transition area */}
        <div 
          className="absolute w-[250px] h-[220px] bg-red-400/1 rounded-full blur-[140px]"
          style={{
            top: '62%',
            left: '45%',
            animation: 'cloudDrift9 65s ease-in-out infinite',
          }}
        />
        
        {/* Additional cloud cluster 5 - top center right */}
        <div 
          className="absolute w-[400px] h-[350px] bg-red-500/5 rounded-full blur-[68px]"
          style={{
            top: '15%',
            right: '25%',
            animation: 'cloudDrift10 53s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[290px] h-[250px] bg-red-600/4 rounded-full blur-[58px]"
          style={{
            top: '18%',
            right: '35%',
            animation: 'cloudDrift10 53s ease-in-out infinite',
            animationDelay: '1.8s',
          }}
        />
        
        {/* Additional cloud cluster 6 - middle left */}
        <div 
          className="absolute w-[380px] h-[330px] bg-red-500/4 rounded-full blur-[64px]"
          style={{
            top: '48%',
            left: '25%',
            animation: 'cloudDrift11 49s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[270px] h-[240px] bg-red-600/3 rounded-full blur-[56px]"
          style={{
            top: '52%',
            left: '32%',
            animation: 'cloudDrift11 49s ease-in-out infinite',
            animationDelay: '2.2s',
          }}
        />
        
        {/* Additional cloud cluster 7 - bottom center */}
        <div 
          className="absolute w-[420px] h-[370px] bg-red-600/5 rounded-full blur-[70px]"
          style={{
            bottom: '25%',
            left: '40%',
            animation: 'cloudDrift12 51s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[300px] h-[260px] bg-red-500/4 rounded-full blur-[60px]"
          style={{
            bottom: '30%',
            left: '48%',
            animation: 'cloudDrift12 51s ease-in-out infinite',
            animationDelay: '1.5s',
          }}
        />
        
        {/* Additional individual clouds */}
        <div 
          className="absolute w-[320px] h-[280px] bg-red-500/4 rounded-full blur-[75px]"
          style={{
            top: '5%',
            left: '20%',
            animation: 'cloudDrift13 57s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[280px] h-[240px] bg-red-400/3 rounded-full blur-[85px]"
          style={{
            top: '30%',
            right: '5%',
            animation: 'cloudDrift14 54s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[300px] h-[260px] bg-red-500/4 rounded-full blur-[72px]"
          style={{
            top: '65%',
            left: '15%',
            animation: 'cloudDrift15 56s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[260px] h-[230px] bg-red-600/3 rounded-full blur-[80px]"
          style={{
            bottom: '8%',
            left: '35%',
            animation: 'cloudDrift16 58s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[310px] h-[270px] bg-red-500/4 rounded-full blur-[66px]"
          style={{
            top: '28%',
            left: '55%',
            animation: 'cloudDrift17 50s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[270px] h-[240px] bg-red-400/3 rounded-full blur-[88px]"
          style={{
            bottom: '35%',
            right: '30%',
            animation: 'cloudDrift18 59s ease-in-out infinite',
          }}
        />
      </div>
      
      <style>{`
        @keyframes cloudDrift1 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(800px, -200px) scale(1.15); }
          50% { transform: translate(1200px, -100px) scale(0.9); }
          75% { transform: translate(600px, 150px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift2 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-900px, 250px) scale(1.2); }
          50% { transform: translate(-1400px, 100px) scale(0.85); }
          75% { transform: translate(-700px, -180px) scale(1.15); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift3 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-600px, 400px) scale(1.25); }
          66% { transform: translate(500px, -350px) scale(0.8); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift4 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(1000px, -300px) scale(1.1); }
          50% { transform: translate(1500px, 200px) scale(0.9); }
          75% { transform: translate(800px, 100px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift5 {
          0% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(-700px, -400px) scale(1.2); }
          60% { transform: translate(-1100px, 300px) scale(0.85); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift6 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(400px, 600px) scale(1.15); }
          50% { transform: translate(700px, 400px) scale(0.9); }
          75% { transform: translate(500px, -200px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift7 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(1100px, -350px) scale(1.25); }
          66% { transform: translate(1600px, 400px) scale(0.8); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift8 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-800px, -250px) scale(1.1); }
          50% { transform: translate(-1300px, 200px) scale(0.9); }
          75% { transform: translate(-600px, 300px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift9 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(600px, -200px) scale(1.1); }
          66% { transform: translate(900px, 300px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift10 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-500px, 180px) scale(1.12); }
          50% { transform: translate(-800px, -100px) scale(0.88); }
          75% { transform: translate(-400px, 120px) scale(1.08); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift11 {
          0% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(550px, -250px) scale(1.18); }
          60% { transform: translate(900px, 150px) scale(0.85); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift12 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-450px, -180px) scale(1.1); }
          50% { transform: translate(-750px, 200px) scale(0.92); }
          75% { transform: translate(-350px, -120px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift13 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(700px, 220px) scale(1.15); }
          66% { transform: translate(1100px, -150px) scale(0.87); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift14 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-600px, -220px) scale(1.2); }
          50% { transform: translate(-950px, 130px) scale(0.9); }
          75% { transform: translate(-500px, -100px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift15 {
          0% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(480px, 280px) scale(1.16); }
          60% { transform: translate(850px, -180px) scale(0.86); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift16 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-520px, 190px) scale(1.13); }
          50% { transform: translate(-880px, -140px) scale(0.89); }
          75% { transform: translate(-420px, 160px) scale(1.07); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift17 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(620px, -240px) scale(1.19); }
          66% { transform: translate(1000px, 170px) scale(0.84); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes cloudDrift18 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-580px, 210px) scale(1.14); }
          50% { transform: translate(-920px, -160px) scale(0.91); }
          75% { transform: translate(-460px, 140px) scale(1.06); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </div>
  )
}

