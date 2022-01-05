import { createClient } from '@supabase/supabase-js';

export default class Supabase {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  public async login(mail: string, password: string) {
    return this.supabase.auth.signIn({
      email: mail,
      password: password,
    });
  }

  public async register(mail: string, password: string) {
    return this.supabase.auth.signUp(
      {        
        email: mail,
        password: password,
      },
      {
        redirectTo: `${window.location.origin}/me?mail=confirmation`,
      }
    );
  }

  public async logout() {
    return this.supabase.auth.signOut();
  }

  public getUser() {
    return this.supabase.auth.user()
  }
}
