const fs = require('fs');
const path = require('path');

const localesDir = path.join(process.cwd(), 'resources/js/locales');
const authDir = path.join(process.cwd(), 'resources/js/pages/auth');

// Add auth translations
for (const lang of ['en', 'fr', 'ar']) {
    const filePath = path.join(localesDir, lang + '.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (lang === 'en') {
        data.auth = {
            login_title: "Sign in to your account",
            login_sub: "Welcome back! Please enter your details.",
            email: "Email address",
            password: "Password",
            remember: "Remember me",
            forgot: "Forgot password?",
            sign_in: "Sign in",
            no_account: "Don't have an account?",
            sign_up: "Sign up",
            register_title: "Create an account",
            register_sub: "Join us today and experience premium car rentals.",
            name: "Full Name",
            confirm: "Confirm Password",
            have_account: "Already have an account?"
        };
    } else if (lang === 'fr') {
        data.auth = {
            login_title: "Connectez-vous à votre compte",
            login_sub: "Content de vous revoir ! Veuillez entrer vos informations.",
            email: "Adresse e-mail",
            password: "Mot de passe",
            remember: "Se souvenir de moi",
            forgot: "Mot de passe oublié ?",
            sign_in: "Se connecter",
            no_account: "Vous n'avez pas de compte ?",
            sign_up: "S'inscrire",
            register_title: "Créer un compte",
            register_sub: "Rejoignez-nous aujourd'hui et profitez de la location de voitures premium.",
            name: "Nom complet",
            confirm: "Confirmer le mot de passe",
            have_account: "Vous avez déjà un compte ?"
        };
    } else if (lang === 'ar') {
        data.auth = {
            login_title: "تسجيل الدخول إلى حسابك",
            login_sub: "مرحبًا بعودتك! يرجى إدخال بياناتك.",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            remember: "تذكرني",
            forgot: "نسيت كلمة المرور؟",
            sign_in: "تسجيل الدخول",
            no_account: "ليس لديك حساب؟",
            sign_up: "إنشاء حساب",
            register_title: "إنشاء حساب",
            register_sub: "انضم إلينا اليوم واستمتع بتأجير السيارات الفاخرة.",
            name: "الاسم الكامل",
            confirm: "تأكيد كلمة المرور",
            have_account: "لديك حساب بالفعل؟"
        };
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of Object.entries(replacements)) {
        content = content.replaceAll(search, replace);
    }
    fs.writeFileSync(filePath, content);
}

replaceInFile(path.join(authDir, 'Login.vue'), {
    'Sign in to your account': '{{ $t("auth.login_title") }}',
    'Welcome back! Please enter your details.': '{{ $t("auth.login_sub") }}',
    'Email address': '{{ $t("auth.email") }}',
    '>Password</Label>': '>{{ $t("auth.password") }}</Label>',
    'Remember me': '{{ $t("auth.remember") }}',
    'Forgot password?': '{{ $t("auth.forgot") }}',
    '>Sign in</Button>': '>{{ $t("auth.sign_in") }}</Button>',
    "Don't have an account?": '{{ $t("auth.no_account") }}',
    'Sign up': '{{ $t("auth.sign_up") }}'
});

replaceInFile(path.join(authDir, 'Register.vue'), {
    'Create an account': '{{ $t("auth.register_title") }}',
    'Enter your details to get started.': '{{ $t("auth.register_sub") }}',
    'Name': '{{ $t("auth.name") }}',
    'Email address': '{{ $t("auth.email") }}',
    '>Password</Label>': '>{{ $t("auth.password") }}</Label>',
    'Confirm Password': '{{ $t("auth.confirm") }}',
    '>Sign up</Button>': '>{{ $t("auth.sign_up") }}</Button>',
    'Already have an account?': '{{ $t("auth.have_account") }}',
    'Sign in': '{{ $t("auth.sign_in") }}'
});

console.log("Auth translated");
