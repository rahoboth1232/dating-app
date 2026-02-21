import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Easing,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  rose:        "#FF3366",
  roseMid:     "#FF6B6B",
  roseLight:   "#FFB3C6",
  amber:       "#FFAD60",
  bg:          "#0D0A14",
  bgMid:       "#160F24",
  bgDeep:      "#080511",
  white:       "#FFFFFF",
  glass:       "rgba(255,255,255,0.07)",
  glassBorder: "rgba(255,255,255,0.13)",
  textDim:     "rgba(255,255,255,0.45)",
  textMid:     "rgba(255,255,255,0.7)",
};

// ─── Profile data ─────────────────────────────────────────────────────────────
const PROFILES = [
  { name: "Aria",  age: 24, city: "Paris", color1: "#FF6B9D", color2: "#C850C0", emoji: "🌸" },
  { name: "Luna",  age: 27, city: "Tokyo", color1: "#4776E6", color2: "#8E54E9", emoji: "🌙" },
  { name: "Sofia", age: 25, city: "Milan", color1: "#F7971E", color2: "#FFD200", emoji: "✨" },
];

// ─── Floating particle ────────────────────────────────────────────────────────
function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  const y       = useRef(new Animated.Value(height + 20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = () => {
      y.setValue(height + 20);
      opacity.setValue(0);
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(y, {
            toValue:  -40,
            duration: 6000 + Math.random() * 4000,
            easing:   Easing.linear,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.7, duration: 800,  useNativeDriver: true }),
            Animated.delay(4000),
            Animated.timing(opacity, { toValue: 0,   duration: 1200, useNativeDriver: true }),
          ]),
        ]),
      ]).start(loop);
    };
    loop();
  }, []);

  return (
    <Animated.Text
      style={{
        position: "absolute",
        left:     x,
        fontSize: size,
        color:    C.roseLight,
        transform: [{ translateY: y }],
        opacity,
      }}
    >
      ♥
    </Animated.Text>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState(0);

  const masterFade = useRef(new Animated.Value(0)).current;
  const logoY      = useRef(new Animated.Value(-30)).current;
  const logoScale  = useRef(new Animated.Value(0.75)).current;
  const cardsY     = useRef(new Animated.Value(60)).current;
  const ctaY       = useRef(new Animated.Value(80)).current;
  const pulse      = useRef(new Animated.Value(1)).current;
  const shimmer    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.stagger(130, [
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1,   tension: 50, friction: 7, useNativeDriver: true }),
        Animated.spring(logoY,     { toValue: 0,   tension: 60, friction: 9, useNativeDriver: true }),
        Animated.timing(masterFade,{ toValue: 1,   duration: 500,            useNativeDriver: true }),
      ]),
      Animated.spring(cardsY, { toValue: 0, tension: 55, friction: 8, useNativeDriver: true }),
      Animated.spring(ctaY,   { toValue: 0, tension: 55, friction: 9, useNativeDriver: true }),
    ]).start();

    // Logo halo pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.15, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();

    // Shimmer sweep
    Animated.loop(
      Animated.timing(shimmer, { toValue: 1, duration: 2400, easing: Easing.linear, useNativeDriver: true })
    ).start();

    // Card auto-cycle
    const t = setInterval(() => setActiveCard((p) => (p + 1) % PROFILES.length), 3000);
    return () => clearInterval(t);
  }, []);

  const PARTICLES = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id:    i,
    x:     Math.random() * width,
    size:  10 + Math.random() * 14,
    delay: Math.random() * 5000,
  })), []);

  const profile = PROFILES[activeCard];

  const CARD_W = width * 0.82;
  const CARD_H = CARD_W * 1.3;

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Deep background */}
      <LinearGradient colors={[C.bgDeep, C.bgMid, "#1A0A2E"]} style={StyleSheet.absoluteFill} />

      {/* Ambient blobs */}
      <View style={[s.blob, { top: -130, right: -90,  backgroundColor: "rgba(255,51,102,0.2)" }]} />
      <View style={[s.blob, { bottom: 40, left: -110, width: 320, height: 320, backgroundColor: "rgba(247,197,159,0.1)" }]} />
      <View style={[s.blob, { top: height * 0.4, right: -70, width: 220, height: 220, backgroundColor: "rgba(142,84,233,0.13)" }]} />

      {/* Ring decorations */}
      <View style={[s.ring, { width: 440, height: 440, top: -90,  right: -150, borderColor: "rgba(255,51,102,0.07)" }]} />
      <View style={[s.ring, { width: 290, height: 290, top:  10,  right:  -70, borderColor: "rgba(255,51,102,0.05)" }]} />
      <View style={[s.ring, { width: 380, height: 380, bottom: 60, left: -170, borderColor: "rgba(247,197,159,0.06)" }]} />

      {/* Floating hearts */}
      {PARTICLES.map((p) => <Particle key={p.id} delay={p.delay} x={p.x} size={p.size} />)}

      {/* ── Content ── */}
      <Animated.View style={[s.content, { opacity: masterFade }]}>

        {/* Logo */}
        <Animated.View style={[s.logoSection, { transform: [{ translateY: logoY }, { scale: logoScale }] }]}>
          <Animated.View style={[s.logoHalo, { transform: [{ scale: pulse }] }]} />
          <LinearGradient colors={[C.rose, "#FF6B9D", C.roseMid]} style={s.logoBadge} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={s.logoSymbol}>♥</Text>
          </LinearGradient>
          <Text style={s.brand}>amoré</Text>
          <View style={s.taglineRow}>
            <View style={s.dash} />
            <Text style={s.tagline}>where love begins</Text>
            <View style={s.dash} />
          </View>
        </Animated.View>

        {/* Card stack */}
        <Animated.View style={[{ alignItems: "center", width: CARD_W }, { transform: [{ translateY: cardsY }] }]}>
          {/* Ghost cards behind */}
          {[2, 1].map((offset) => (
            <View
              key={offset}
              style={{
                position:        "absolute",
                width:           CARD_W,
                height:          CARD_H,
                borderRadius:    28,
                bottom:          offset * -13,
                backgroundColor: C.glass,
                borderWidth:     1,
                borderColor:     C.glassBorder,
                opacity:         1 - offset * 0.32,
                transform:       [{ scale: 1 - offset * 0.04 }, { rotate: `${offset * 2.5}deg` }],
              }}
            />
          ))}

          {/* Main card */}
          <View style={[s.mainCard, { width: CARD_W, height: CARD_H }]}>
            {/* Hero gradient */}
            <LinearGradient colors={[profile.color1, profile.color2]} style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={StyleSheet.absoluteFill} />
              <View style={s.heroContent}>
                <Text style={s.profileEmoji}>{profile.emoji}</Text>
              </View>
              {/* Online indicator */}
              <View style={s.onlineDot} />
              {/* Gradient fade to card body */}
              <LinearGradient
                colors={["transparent", "rgba(13,10,20,0.85)"]}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100 }}
              />
            </LinearGradient>

            {/* Glassmorphic card body */}
            <BlurView intensity={50} tint="dark" style={s.cardBody}>
              <View style={s.cardBodyInner}>
                {/* Name + match */}
                <View style={s.cardHeader}>
                  <View>
                    <Text style={s.profileName}>{profile.name}<Text style={s.profileAge}>,  {profile.age}</Text></Text>
                    <Text style={s.profileCity}>📍 {profile.city}</Text>
                  </View>
                  <LinearGradient colors={[C.rose, C.roseMid]} style={s.matchBadge} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <Text style={s.matchPct}>98%</Text>
                    <Text style={s.matchLbl}>match</Text>
                  </LinearGradient>
                </View>

                {/* Interests */}
                <View style={s.chips}>
                  {["Travel ✈️", "Music 🎵", "Art 🎨", "Coffee ☕"].map((t) => (
                    <View key={t} style={s.chip}>
                      <Text style={s.chipText}>{t}</Text>
                    </View>
                  ))}
                </View>

                {/* Action buttons */}
                <View style={s.cardActions}>
                  <TouchableOpacity style={s.actionPass} activeOpacity={0.8}>
                    <Text style={[s.actionIcon, { color: "#FF6B6B" }]}>✕</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.actionLikeWrap} activeOpacity={0.85}>
                    <LinearGradient colors={[C.rose, C.roseMid]} style={s.actionLike} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                      <Text style={[s.actionIcon, { color: "#fff", fontSize: 26 }]}>♥</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={s.actionStar} activeOpacity={0.8}>
                    <Text style={[s.actionIcon, { color: C.amber }]}>★</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </View>

          {/* Indicator dots */}
          <View style={s.dots}>
            {PROFILES.map((_, i) => (
              <View key={i} style={[s.dot, i === activeCard && s.dotActive]} />
            ))}
          </View>
        </Animated.View>

        {/* CTA section */}
        <Animated.View style={[s.cta, { transform: [{ translateY: ctaY }] }]}>

          {/* Social proof */}
          <View style={s.proof}>
            <View style={{ flexDirection: "row", position: "relative", width: 70, height: 34 }}>
              {["#FF6B9D", "#4776E6", "#F7971E"].map((c, i) => (
                <View key={i} style={[s.miniAvatar, { backgroundColor: c, left: i * 22, zIndex: 3 - i }]}>
                  <Text style={{ fontSize: 12 }}>👤</Text>
                </View>
              ))}
            </View>
            <Text style={s.proofText}><Text style={s.proofBold}>2M+</Text> people found love</Text>
          </View>

          {/* Primary button */}
          <TouchableOpacity style={s.btnPrimaryWrap} onPress={() => router.push("/signup-email")} activeOpacity={0.9}>
            <LinearGradient colors={[C.rose, "#FF6B9D", C.roseMid]} style={s.btnPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              {/* Shimmer sweep */}
              <Animated.View
                style={[
                  s.shimmer,
                  { transform: [{ translateX: shimmer.interpolate({ inputRange: [0, 1], outputRange: [-width, width] }) }] },
                ]}
              />
              <Text style={s.btnPrimaryTxt}>Start Your Journey  →</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.divRow}>
            <View style={s.divLine} />
            <Text style={s.divTxt}>already have an account?</Text>
            <View style={s.divLine} />
          </View>

          {/* Sign in button */}
          <TouchableOpacity style={s.btnSignIn} onPress={() => router.push("/login")} activeOpacity={0.85}>
            <Text style={s.btnSignInTxt}>Sign In</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={s.terms}>
            By joining you agree to our{" "}
            <Text style={s.termLink}>Terms</Text> &{" "}
            <Text style={s.termLink}>Privacy Policy</Text>
          </Text>
        </Animated.View>

      </Animated.View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  blob: {
    position:     "absolute",
    width:        400,
    height:       400,
    borderRadius: 999,
  },
  ring: {
    position:     "absolute",
    borderRadius: 999,
    borderWidth:  1,
  },

  content: {
    flex:              1,
    alignItems:        "center",
    justifyContent:    "space-between",
    paddingTop:        Platform.OS === "ios" ? 64 : 48,
    paddingBottom:     36,
    paddingHorizontal: 24,
  },

  // Logo
  logoSection: { alignItems: "center" },
  logoHalo: {
    position:        "absolute",
    width:           90,
    height:          90,
    borderRadius:    45,
    backgroundColor: "rgba(255,51,102,0.28)",
    top:             -6,
    shadowColor:     C.rose,
    shadowOffset:    { width: 0, height: 0 },
    shadowOpacity:   1,
    shadowRadius:    30,
    elevation:       20,
  },
  logoBadge: {
    width:         76,
    height:        76,
    borderRadius:  24,
    alignItems:    "center",
    justifyContent:"center",
    shadowColor:   C.rose,
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.7,
    shadowRadius:  20,
    elevation:     20,
  },
  logoSymbol: { fontSize: 34, color: "#fff" },

  brand: {
    marginTop:       14,
    fontSize:        44,
    fontWeight:      "800",
    color:           C.white,
    letterSpacing:   -1.5,
    fontStyle:       "italic",
    fontFamily:      Platform.OS === "ios" ? "Georgia" : "serif",
    textShadowColor: "rgba(255,51,102,0.45)",
    textShadowOffset:{ width: 0, height: 4 },
    textShadowRadius:14,
  },
  taglineRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 },
  dash:       { width: 28, height: 1, backgroundColor: "rgba(255,255,255,0.2)" },
  tagline:    { fontSize: 11, color: C.textDim, letterSpacing: 2.8, textTransform: "uppercase" },

  // Card
  mainCard: {
    borderRadius:  28,
    overflow:      "hidden",
    shadowColor:   "#000",
    shadowOffset:  { width: 0, height: 24 },
    shadowOpacity: 0.65,
    shadowRadius:  40,
    elevation:     30,
    borderWidth:   1,
    borderColor:   "rgba(255,255,255,0.12)",
  },
  heroContent: {
    flex:          1,
    alignItems:    "center",
    justifyContent:"center",
  },
  profileEmoji: {
    fontSize:          80,
    textShadowColor:   "rgba(0,0,0,0.3)",
    textShadowOffset:  { width: 0, height: 4 },
    textShadowRadius:  10,
  },
  onlineDot: {
    position:      "absolute",
    top:           16,
    right:         16,
    width:         12,
    height:        12,
    borderRadius:  6,
    backgroundColor:"#4ADE80",
    borderWidth:   2,
    borderColor:   "#fff",
    shadowColor:   "#4ADE80",
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius:  6,
    elevation:     8,
  },

  cardBody: {
    borderTopLeftRadius:  20,
    borderTopRightRadius: 20,
    overflow:             "hidden",
    borderTopWidth:       1,
    borderColor:          "rgba(255,255,255,0.1)",
  } as any,
  cardBodyInner: { padding: 16 },

  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  profileName: { fontSize: 22, fontWeight: "800", color: C.white, letterSpacing: -0.5 },
  profileAge:  { fontSize: 18, fontWeight: "400", color: "rgba(255,255,255,0.65)" },
  profileCity: { fontSize: 12, color: C.textMid, marginTop: 2 },

  matchBadge: {
    paddingHorizontal: 10,
    paddingVertical:   7,
    borderRadius:      12,
    alignItems:        "center",
    shadowColor:       C.rose,
    shadowOffset:      { width: 0, height: 4 },
    shadowOpacity:     0.5,
    shadowRadius:      8,
    elevation:         8,
  },
  matchPct: { fontSize: 16, fontWeight: "800", color: "#fff" },
  matchLbl: { fontSize: 9,  color: "rgba(255,255,255,0.8)", letterSpacing: 1 },

  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 14 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderRadius:      100,
    backgroundColor:   "rgba(255,255,255,0.1)",
    borderWidth:       1,
    borderColor:       "rgba(255,255,255,0.14)",
  },
  chipText: { fontSize: 11, color: C.textMid, fontWeight: "500" },

  cardActions: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 18 },
  actionPass: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: "center", justifyContent: "center",
    backgroundColor: "rgba(255,107,107,0.12)",
    borderWidth: 1, borderColor: "rgba(255,107,107,0.2)",
  },
  actionLikeWrap: {
    width: 64, height: 64, borderRadius: 32, overflow: "hidden",
    shadowColor: C.rose, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7, shadowRadius: 18, elevation: 16,
  },
  actionLike: { flex: 1, alignItems: "center", justifyContent: "center" },
  actionStar: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: "center", justifyContent: "center",
    backgroundColor: "rgba(255,173,96,0.12)",
    borderWidth: 1, borderColor: "rgba(255,173,96,0.2)",
  },
  actionIcon: { fontSize: 18 },

  dots:     { flexDirection: "row", gap: 6, marginTop: 14 },
  dot:      { width: 6,  height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.2)" },
  dotActive:{ width: 22, height: 6, borderRadius: 3, backgroundColor: C.rose },

  // CTA
  cta: { width: "100%", alignItems: "center", gap: 14 },

  proof: { flexDirection: "row", alignItems: "center", gap: 12 },
  miniAvatar: {
    position: "absolute", width: 32, height: 32, borderRadius: 16,
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: C.bgMid,
  },
  proofText: { fontSize: 13, color: C.textMid },
  proofBold: { color: C.white, fontWeight: "700" },

  btnPrimaryWrap: {
    width:         "100%",
    borderRadius:  16,
    overflow:      "hidden",
    shadowColor:   C.rose,
    shadowOffset:  { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius:  22,
    elevation:     18,
  },
  btnPrimary: {
    height:         58,
    alignItems:     "center",
    justifyContent: "center",
    overflow:       "hidden",
  },
  shimmer: {
    position:        "absolute",
    top: 0, bottom: 0,
    width:           70,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  btnPrimaryTxt: {
    fontSize:          17,
    fontWeight:        "700",
    color:             "#fff",
    letterSpacing:     0.4,
    textShadowColor:   "rgba(0,0,0,0.2)",
    textShadowOffset:  { width: 0, height: 1 },
    textShadowRadius:  4,
  },

  divRow: { flexDirection: "row", alignItems: "center", width: "100%", gap: 10 },
  divLine:{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.1)" },
  divTxt: { fontSize: 11.5, color: C.textDim, letterSpacing: 0.2 },

  btnSignIn: {
    width:             "100%",
    height:            52,
    borderRadius:      16,
    alignItems:        "center",
    justifyContent:    "center",
    borderWidth:       1.5,
    borderColor:       "rgba(255,255,255,0.18)",
    backgroundColor:   "rgba(255,255,255,0.06)",
  },
  btnSignInTxt: { fontSize: 16, fontWeight: "600", color: C.white, letterSpacing: 0.3 },

  terms:    { fontSize: 11, color: "rgba(255,255,255,0.28)", textAlign: "center", lineHeight: 17 },
  termLink: { color: "rgba(255,179,198,0.7)", fontWeight: "600" },
});