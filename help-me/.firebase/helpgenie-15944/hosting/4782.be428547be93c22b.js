"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4782],{4782:(E,h,c)=>{c.r(h),c.d(h,{FirebaseAuthenticationWeb:()=>I});var s=c(5861),R=c(2726),t=c(8475),l=c(1718);let I=(()=>{class a extends R.Uw{constructor(){super(),this.lastConfirmationResult=new Map,(0,t.v0)().onAuthStateChanged(r=>this.handleAuthStateChange(r))}applyActionCode(e){return(0,s.Z)(function*(){const r=(0,t.v0)();return(0,t.iA)(r,e.oobCode)})()}createUserWithEmailAndPassword(e){var r=this;return(0,s.Z)(function*(){const n=(0,t.v0)(),i=yield(0,t.Xb)(n,e.email,e.password);return r.createSignInResult(i,null)})()}confirmPasswordReset(e){return(0,s.Z)(function*(){const r=(0,t.v0)();return(0,t.LG)(r,e.oobCode,e.newPassword)})()}confirmVerificationCode(e){var r=this;return(0,s.Z)(function*(){const{verificationCode:n,verificationId:i}=e,u=r.lastConfirmationResult.get(i);if(!u)throw new Error(a.ERROR_CONFIRMATION_RESULT_MISSING);const o=yield u.confirm(n);return r.createSignInResult(o,null)})()}deleteUser(){return(0,s.Z)(function*(){const r=(0,t.v0)().currentUser;if(!r)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return(0,t.h8)(r)})()}getCurrentUser(){var e=this;return(0,s.Z)(function*(){const r=(0,t.v0)();return{user:e.createUserResult(r.currentUser)}})()}getIdToken(e){return(0,s.Z)(function*(){const r=(0,t.v0)();if(!r.currentUser)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return{token:(yield r.currentUser.getIdToken(null==e?void 0:e.forceRefresh))||""}})()}getRedirectResult(){var e=this;return(0,s.Z)(function*(){const r=(0,t.v0)(),n=yield(0,t.cx)(r),i=n?t.O4.credentialFromResult(n):null;return e.createSignInResult(n,i)})()}getTenantId(){return(0,s.Z)(function*(){return{tenantId:(0,t.v0)().tenantId}})()}isSignInWithEmailLink(e){return(0,s.Z)(function*(){const r=(0,t.v0)();return{isSignInWithEmailLink:(0,t.JB)(r,e.emailLink)}})()}linkWithApple(e){var r=this;return(0,s.Z)(function*(){const n=new t.O4(l.F.APPLE);r.applySignInOptions(e||{},n);const i=yield r.linkCurrentUserWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.O4.credentialFromResult(i);return r.createSignInResult(i,u)})()}linkWithEmailAndPassword(e){var r=this;return(0,s.Z)(function*(){const n=t.w9.credential(e.email,e.password),i=yield r.linkCurrentUserWithCredential(n);return r.createSignInResult(i,n)})()}linkWithEmailLink(e){var r=this;return(0,s.Z)(function*(){const n=t.w9.credentialWithLink(e.email,e.emailLink),i=yield r.linkCurrentUserWithCredential(n);return r.createSignInResult(i,n)})()}linkWithFacebook(e){var r=this;return(0,s.Z)(function*(){const n=new t._O;r.applySignInOptions(e||{},n);const i=yield r.linkCurrentUserWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t._O.credentialFromResult(i);return r.createSignInResult(i,u)})()}linkWithGameCenter(){return(0,s.Z)(function*(){throw new Error("Not available on web.")})()}linkWithGithub(e){var r=this;return(0,s.Z)(function*(){const n=new t.GH;r.applySignInOptions(e||{},n);const i=yield r.linkCurrentUserWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.GH.credentialFromResult(i);return r.createSignInResult(i,u)})()}linkWithGoogle(e){var r=this;return(0,s.Z)(function*(){const n=new t.hJ;r.applySignInOptions(e||{},n);const i=yield r.linkCurrentUserWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.hJ.credentialFromResult(i);return r.createSignInResult(i,u)})()}linkWithMicrosoft(e){var r=this;return(0,s.Z)(function*(){const n=new t.O4(l.F.MICROSOFT);r.applySignInOptions(e||{},n);const i=yield r.linkCurrentUserWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.O4.credentialFromResult(i);return r.createSignInResult(i,u)})()}linkWithPhoneNumber(e){var r=this;return(0,s.Z)(function*(){const i=(0,t.v0)().currentUser;if(!i)throw new Error(a.ERROR_NO_USER_SIGNED_IN);if(!e.phoneNumber)throw new Error(a.ERROR_PHONE_NUMBER_MISSING);if(!(e.recaptchaVerifier&&e.recaptchaVerifier instanceof t.lI))throw new Error(a.ERROR_RECAPTCHA_VERIFIER_MISSING);try{const u=yield(0,t.L6)(i,e.phoneNumber,e.recaptchaVerifier),{verificationId:o}=u;r.lastConfirmationResult.set(o,u),r.notifyListeners(a.PHONE_CODE_SENT_EVENT,{verificationId:o})}catch(u){const o={message:r.getErrorMessage(u)};r.notifyListeners(a.PHONE_VERIFICATION_FAILED_EVENT,o)}})()}linkWithPlayGames(){return(0,s.Z)(function*(){throw new Error("Not available on web.")})()}linkWithTwitter(e){var r=this;return(0,s.Z)(function*(){const n=new t.c4;r.applySignInOptions(e||{},n);const i=yield r.linkCurrentUserWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.c4.credentialFromResult(i);return r.createSignInResult(i,u)})()}linkWithYahoo(e){var r=this;return(0,s.Z)(function*(){const n=new t.O4(l.F.YAHOO);r.applySignInOptions(e||{},n);const i=yield r.linkCurrentUserWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.O4.credentialFromResult(i);return r.createSignInResult(i,u)})()}reload(){return(0,s.Z)(function*(){const r=(0,t.v0)().currentUser;if(!r)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return(0,t.H5)(r)})()}sendEmailVerification(){return(0,s.Z)(function*(){const r=(0,t.v0)().currentUser;if(!r)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return(0,t.w$)(r)})()}sendPasswordResetEmail(e){return(0,s.Z)(function*(){const r=(0,t.v0)();return(0,t.LS)(r,e.email)})()}sendSignInLinkToEmail(e){return(0,s.Z)(function*(){const r=(0,t.v0)();return(0,t.oo)(r,e.email,e.actionCodeSettings)})()}setLanguageCode(e){return(0,s.Z)(function*(){(0,t.v0)().languageCode=e.languageCode})()}setPersistence(e){return(0,s.Z)(function*(){const r=(0,t.v0)();switch(e.persistence){case l.n.BrowserLocal:yield(0,t.Fb)(r,t.a$);break;case l.n.BrowserSession:yield(0,t.Fb)(r,t.aT);break;case l.n.IndexedDbLocal:yield(0,t.Fb)(r,t.AP);break;case l.n.InMemory:yield(0,t.Fb)(r,t.BV)}})()}setTenantId(e){return(0,s.Z)(function*(){(0,t.v0)().tenantId=e.tenantId})()}signInAnonymously(){var e=this;return(0,s.Z)(function*(){const r=(0,t.v0)(),n=yield(0,t.XB)(r);return e.createSignInResult(n,null)})()}signInWithApple(e){var r=this;return(0,s.Z)(function*(){const n=new t.O4(l.F.APPLE);r.applySignInOptions(e||{},n);const i=yield r.signInWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.O4.credentialFromResult(i);return r.createSignInResult(i,u)})()}signInWithCustomToken(e){var r=this;return(0,s.Z)(function*(){const n=(0,t.v0)(),i=yield(0,t._p)(n,e.token);return r.createSignInResult(i,null)})()}signInWithEmailAndPassword(e){var r=this;return(0,s.Z)(function*(){const n=(0,t.v0)(),i=yield(0,t.e5)(n,e.email,e.password);return r.createSignInResult(i,null)})()}signInWithEmailLink(e){var r=this;return(0,s.Z)(function*(){const n=(0,t.v0)(),i=yield(0,t.P6)(n,e.email,e.emailLink);return r.createSignInResult(i,null)})()}signInWithFacebook(e){var r=this;return(0,s.Z)(function*(){const n=new t._O;r.applySignInOptions(e||{},n);const i=yield r.signInWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t._O.credentialFromResult(i);return r.createSignInResult(i,u)})()}signInWithGithub(e){var r=this;return(0,s.Z)(function*(){const n=new t.GH;r.applySignInOptions(e||{},n);const i=yield r.signInWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.GH.credentialFromResult(i);return r.createSignInResult(i,u)})()}signInWithGoogle(e){var r=this;return(0,s.Z)(function*(){const n=new t.hJ;r.applySignInOptions(e||{},n);const i=yield r.signInWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.hJ.credentialFromResult(i);return r.createSignInResult(i,u)})()}signInWithMicrosoft(e){var r=this;return(0,s.Z)(function*(){const n=new t.O4(l.F.MICROSOFT);r.applySignInOptions(e||{},n);const i=yield r.signInWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.O4.credentialFromResult(i);return r.createSignInResult(i,u)})()}signInWithPhoneNumber(e){var r=this;return(0,s.Z)(function*(){if(!e.phoneNumber)throw new Error(a.ERROR_PHONE_NUMBER_MISSING);if(!(e.recaptchaVerifier&&e.recaptchaVerifier instanceof t.lI))throw new Error(a.ERROR_RECAPTCHA_VERIFIER_MISSING);const n=(0,t.v0)();try{const i=yield(0,t.$g)(n,e.phoneNumber,e.recaptchaVerifier),{verificationId:u}=i;r.lastConfirmationResult.set(u,i),r.notifyListeners(a.PHONE_CODE_SENT_EVENT,{verificationId:u})}catch(i){const u={message:r.getErrorMessage(i)};r.notifyListeners(a.PHONE_VERIFICATION_FAILED_EVENT,u)}})()}signInWithPlayGames(){return(0,s.Z)(function*(){throw new Error("Not available on web.")})()}signInWithGameCenter(){return(0,s.Z)(function*(){throw new Error("Not available on web.")})()}signInWithTwitter(e){var r=this;return(0,s.Z)(function*(){const n=new t.c4;r.applySignInOptions(e||{},n);const i=yield r.signInWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.c4.credentialFromResult(i);return r.createSignInResult(i,u)})()}signInWithYahoo(e){var r=this;return(0,s.Z)(function*(){const n=new t.O4(l.F.YAHOO);r.applySignInOptions(e||{},n);const i=yield r.signInWithPopupOrRedirect(n,null==e?void 0:e.mode),u=t.O4.credentialFromResult(i);return r.createSignInResult(i,u)})()}signOut(){return(0,s.Z)(function*(){yield(0,t.v0)().signOut()})()}unlink(e){var r=this;return(0,s.Z)(function*(){const n=(0,t.v0)();if(!n.currentUser)throw new Error(a.ERROR_NO_USER_SIGNED_IN);const i=yield(0,t.qB)(n.currentUser,e.providerId);return{user:r.createUserResult(i)}})()}updateEmail(e){return(0,s.Z)(function*(){const n=(0,t.v0)().currentUser;if(!n)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return(0,t.s)(n,e.newEmail)})()}updatePassword(e){return(0,s.Z)(function*(){const n=(0,t.v0)().currentUser;if(!n)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return(0,t.gQ)(n,e.newPassword)})()}updateProfile(e){return(0,s.Z)(function*(){const n=(0,t.v0)().currentUser;if(!n)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return(0,t.ck)(n,e)})()}useAppLanguage(){return(0,s.Z)(function*(){(0,t.v0)().useDeviceLanguage()})()}useEmulator(e){return(0,s.Z)(function*(){const r=(0,t.v0)(),n=e.port||9099,i=e.scheme||"http";e.host.includes("://")?(0,t.S$)(r,`${e.host}:${n}`):(0,t.S$)(r,`${i}://${e.host}:${n}`)})()}handleAuthStateChange(e){const n={user:this.createUserResult(e)};this.notifyListeners(a.AUTH_STATE_CHANGE_EVENT,n)}applySignInOptions(e,r){if(e.customParameters){const n={};e.customParameters.map(i=>{n[i.key]=i.value}),r.setCustomParameters(n)}if(e.scopes)for(const n of e.scopes)r.addScope(n)}signInWithPopupOrRedirect(e,r){const n=(0,t.v0)();return"redirect"===r?(0,t.F6)(n,e):(0,t.rh)(n,e)}linkCurrentUserWithPopupOrRedirect(e,r){const n=(0,t.v0)();if(!n.currentUser)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return"redirect"===r?(0,t.WV)(n.currentUser,e):(0,t.k9)(n.currentUser,e)}linkCurrentUserWithCredential(e){const r=(0,t.v0)();if(!r.currentUser)throw new Error(a.ERROR_NO_USER_SIGNED_IN);return(0,t.ZJ)(r.currentUser,e)}createSignInResult(e,r){return{user:this.createUserResult((null==e?void 0:e.user)||null),credential:this.createCredentialResult(r),additionalUserInfo:this.createAdditionalUserInfoResult(e)}}createCredentialResult(e){if(!e)return null;const r={providerId:e.providerId};return e instanceof t.jh&&(r.accessToken=e.accessToken,r.idToken=e.idToken,r.secret=e.secret),r}createUserResult(e){return e?{displayName:e.displayName,email:e.email,emailVerified:e.emailVerified,isAnonymous:e.isAnonymous,metadata:this.createUserMetadataResult(e.metadata),phoneNumber:e.phoneNumber,photoUrl:e.photoURL,providerData:this.createUserProviderDataResult(e.providerData),providerId:e.providerId,tenantId:e.tenantId,uid:e.uid}:null}createUserMetadataResult(e){const r={};return e.creationTime&&(r.creationTime=Date.parse(e.creationTime)),e.lastSignInTime&&(r.lastSignInTime=Date.parse(e.lastSignInTime)),r}createUserProviderDataResult(e){return e.map(r=>({displayName:r.displayName,email:r.email,phoneNumber:r.phoneNumber,photoUrl:r.photoURL,providerId:r.providerId,uid:r.uid}))}createAdditionalUserInfoResult(e){if(!e)return null;const r=(0,t.gK)(e);if(!r)return null;const{isNewUser:n,profile:i,providerId:u,username:o}=r,d={isNewUser:n};return null!==u&&(d.providerId=u),null!==i&&(d.profile=i),null!=o&&(d.username=o),d}getErrorMessage(e){return e instanceof Object&&"message"in e&&"string"==typeof e.message?e.message:JSON.stringify(e)}}return a.AUTH_STATE_CHANGE_EVENT="authStateChange",a.PHONE_CODE_SENT_EVENT="phoneCodeSent",a.PHONE_VERIFICATION_FAILED_EVENT="phoneVerificationFailed",a.ERROR_NO_USER_SIGNED_IN="No user is signed in.",a.ERROR_PHONE_NUMBER_MISSING="phoneNumber must be provided.",a.ERROR_RECAPTCHA_VERIFIER_MISSING="recaptchaVerifier must be provided and must be an instance of RecaptchaVerifier.",a.ERROR_CONFIRMATION_RESULT_MISSING="No confirmation result with this verification id was found.",a})()}}]);