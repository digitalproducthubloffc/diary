import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar rightContent={
        <>
          <Link href='/login' className='btn-secondary' style={{ border: 'none', backgroundColor: 'transparent', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.875rem' }}>Log In</Link>
          <Link href='/register' className='btn-primary' style={{ boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)', borderRadius: '99px', padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>Sign Up</Link>
        </>
      } />
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem', background: 'var(--hero-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Blog
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
          This page is currently under construction. Check back later for updates!
        </p>
      </section>
      <Footer />
    </main>
  );
}
