import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  FlatList,
  Platform,
  Button,
} from "react-native";
const { width, height } = Dimensions.get("window");
const PROFILES = [

  {
    id: "1",
    name: "Sophia, 26",
    location: "New York, NY",
    tag: "🎨 Art Lover",
    color: "#ff6b8a",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    match: "97%",
  },
  {
    id: "2",
    name: "Emma, 24",
    location: "Los Angeles, CA",
    tag: "🎵 Musician",
    color: "#a855f7",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    match: "91%",
  },
  {
    id: "3",
    name: "Olivia, 28",
    location: "Chicago, IL",
    tag: "✈️ Traveler",
    color: "#f97316",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    match: "88%",
  },
  {
    id: "4",
    name: "Isabella, 25",
    location: "Miami, FL",
    tag: "🌊 Beach Life",
    color: "#06b6d4",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    match: "85%",
  },
  {
    id: "5",
    name: "Mia, 27",
    location: "Seattle, WA",
    tag: "📚 Bookworm",
    color: "#10b981",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    match: "82%",
  },
];
const FEATURES = [
  {
    icon: "💫",
    title: "Smart Matching",
    desc: "AI-powered compatibility scoring finds your perfect partner.",
  },
  {
    icon: "🔒",
    title: "Private & Safe",
    desc: "End-to-end encryption keeps your conversations confidential.",
  },
  {
    icon: "💬",
    title: "Real Connections",
    desc: "Video, voice, and chat tools to build genuine relationships.",
  },
];

function HeartButton({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [liked, setLiked] = useState(false);
  const handlePress = () => {
    setLiked((prev) => !prev);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.4, useNativeDriver: true, speed: 50 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }),
    ]).start();
    onPress && onPress();
  };
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.Text style={[styles.heartIcon, { transform: [{ scale }] }]}>
        {liked ? "❤️" : "🤍"}
      </Animated.Text>
    </TouchableOpacity>
  );
}
function ProfileCard({ item, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.profileCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.profileImageWrapper, { borderColor: item.color }]}>
        <Image source={{ uri: item.avatar }} style={styles.profileImage} />
        <View style={[styles.matchBadge, { backgroundColor: item.color }]}>
          <Text style={styles.matchText}>{item.match}</Text>
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text style={styles.profileLocation}>📍 {item.location}</Text>
        <View style={[styles.profileTag, { backgroundColor: item.color + "22" }]}>
          <Text style={[styles.profileTagText, { color: item.color }]}>{item.tag}</Text>
        </View>
      </View>

      <HeartButton />
    </Animated.View>
  );
}

function FeatureCard({ item, index }) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 150 + 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 150 + 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.featureCard,
        { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Text style={styles.featureIcon}>{item.icon}</Text>
      <Text style={styles.featureTitle}>{item.title}</Text>
      <Text style={styles.featureDesc}>{item.desc}</Text>
    </Animated.View>
  );
}

function HeroSection({ onStartMatching }) {
  const titleAnim = useRef(new Animated.Value(-40)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.spring(titleAnim, { toValue: 0, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(btnOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleBtnPressIn = () =>
    Animated.spring(btnScale, { toValue: 0.95, useNativeDriver: true }).start();
  const handleBtnPressOut = () =>
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={styles.heroSection}>
      {/* Decorative blobs */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />

      <Animated.Text style={styles.logoText}>💖 Matchify</Animated.Text>

      <Animated.Text
        style={[
          styles.heroTitle,
          { opacity: titleOpacity, transform: [{ translateY: titleAnim }] },
        ]}
      >
        {"Find Your\nPerfect Spark"}
      </Animated.Text>

      <Animated.Text style={[styles.heroSubtitle, { opacity: subtitleOpacity }]}>
        Thousands of real people. One genuine connection waiting for you.
      </Animated.Text>

      <Animated.View
        style={{
          opacity: btnOpacity,
          transform: [{ scale: btnScale }],
          alignItems: "center",
          gap: 14,
        }}
      >
        <TouchableOpacity
          style={styles.primaryBtn}
          onPressIn={handleBtnPressIn}
          onPressOut={handleBtnPressOut}
          onPress={onStartMatching}
          activeOpacity={1}
        >
          <Text style={styles.primaryBtnText}>✨ Start Matching</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.secondaryBtnText}>Sign in →</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.statsRow}>
        {[
          { val: "2.4M+", label: "Members" },
          { val: "180K+", label: "Matches" },
          { val: "4.9★", label: "Rating" },
        ].map((s) => (
          <View key={s.label} style={styles.statItem}>
            <Text style={styles.statVal}>{s.val}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}


function AboutSection() {
  return (
    <View style={styles.aboutSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionChip}>ABOUT MATCHIFY</Text>
        <Text style={styles.sectionTitle}>Love, Redefined</Text>
        <Text style={styles.sectionSubtitle}>
          Matchify blends cutting-edge AI with a deeply human approach to help
          you find relationships that actually last — not just another swipe.
        </Text>
      </View>

      <View style={styles.featuresGrid}>
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} item={f} index={i} />
        ))}
      </View>
    </View>
  );
}

function ProfilesSection({navigation}) {
  return (
    <View style={styles.profilesSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionChip}>DISCOVER</Text>
        <Text style={styles.sectionTitle}>People Near You</Text>
        <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')} // Navigate to the Profile screen
      />
      </View>

      <FlatList
        data={PROFILES}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ProfileCard item={item} index={index} />
        )}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12 }}
      />

      <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.8}>
        <Text style={styles.viewAllText}>View All Profiles →</Text>
      </TouchableOpacity>
    </View>
  );
}

function Footer() {
  const links = [
    ["About", "Careers", "Blog"],
    ["Help", "Safety", "Privacy"],
    ["Terms", "Cookie Policy", "Contact"],
  ];

  return (
    <View style={styles.footer}>
      <View style={styles.footerTop}>
        <Text style={styles.footerLogo}>💖 Matchify</Text>
        <Text style={styles.footerTagline}>
          Where real connections begin.
        </Text>

        <View style={styles.socialRow}>
          {["𝕏", "f", "in", "▶"].map((icon, i) => (
            <TouchableOpacity key={i} style={styles.socialBtn} activeOpacity={0.7}>
              <Text style={styles.socialIcon}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footerDivider} />

      <View style={styles.footerLinks}>
        {links.flat().map((link) => (
          <TouchableOpacity key={link} activeOpacity={0.7}>
            <Text style={styles.footerLink}>{link}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footerCopy}>
        © 2025 Matchify Inc. Made with ❤️ for real love.
      </Text>
    </View>
  );
}

export default function Home() {
  const scrollRef = useRef(null);

  const handleStartMatching = () => {
    scrollRef.current?.scrollTo({ y: height * 0.9, animated: true });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#ff4d6d" />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <HeroSection onStartMatching={handleStartMatching} />
        <AboutSection />
        <ProfilesSection />
        <Footer />
      </ScrollView>
    </View>
  );
}

const PINK = "#ff4d6d";
const DARK_PINK = "#e63e5c";
const BG = "#0d0d14";
const CARD = "#16161f";
const BORDER = "#2a2a3a";
const TEXT = "#f0f0f5";
const MUTED = "#8888aa";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  heroSection: {
    minHeight: height,
    backgroundColor: PINK,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 60,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#ff6b8a",
    top: -80,
    right: -80,
    opacity: 0.5,
  },
  blob2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#c9184a",
    bottom: 60,
    left: -60,
    opacity: 0.4,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 36,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    lineHeight: 54,
    marginBottom: 18,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: 300,
  },
  primaryBtn: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 52,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  primaryBtnText: {
    fontSize: 17,
    fontWeight: "800",
    color: PINK,
    letterSpacing: 0.5,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
  },
  statsRow: {
    flexDirection: "row",
    gap: 36,
    marginTop: 52,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  statItem: {
    alignItems: "center",
  },
  statVal: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
    fontWeight: "600",
  },

  aboutSection: {
    backgroundColor: BG,
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    marginBottom: 32,
    alignItems: "center",
  },
  sectionChip: {
    fontSize: 11,
    fontWeight: "800",
    color: PINK,
    letterSpacing: 3,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: TEXT,
    textAlign: "center",
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: MUTED,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 320,
  },
  featuresGrid: {
    gap: 14,
  },
  featureCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: BORDER,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: TEXT,
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    color: MUTED,
    lineHeight: 22,
  },

  profilesSection: {
    backgroundColor: "#0a0a12",
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  profileCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
    gap: 14,
  },
  profileImageWrapper: {
    position: "relative",
    borderWidth: 2.5,
    borderRadius: 35,
  },
  profileImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  matchBadge: {
    position: "absolute",
    bottom: -6,
    right: -6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0a0a12",
  },
  matchText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#fff",
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT,
  },
  profileLocation: {
    fontSize: 12,
    color: MUTED,
  },
  profileTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  profileTagText: {
    fontSize: 11,
    fontWeight: "700",
  },
  heartIcon: {
    fontSize: 26,
  },
  viewAllBtn: {
    marginTop: 24,
    backgroundColor: PINK,
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },

  // ── Footer ────────────────────
  footer: {
    backgroundColor: "#08080f",
    paddingTop: 48,
    paddingBottom: 36,
    paddingHorizontal: 24,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  footerTop: {
    alignItems: "center",
    marginBottom: 28,
  },
  footerLogo: {
    fontSize: 26,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: 1,
    marginBottom: 8,
  },
  footerTagline: {
    fontSize: 14,
    color: MUTED,
    marginBottom: 20,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    fontSize: 14,
    color: TEXT,
    fontWeight: "700",
  },
  footerDivider: {
    width: "100%",
    height: 1,
    backgroundColor: BORDER,
    marginBottom: 24,
  },
  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  footerLink: {
    fontSize: 13,
    color: MUTED,
    fontWeight: "500",
  },
  footerCopy: {
    fontSize: 12,
    color: "#44445a",
    textAlign: "center",
  },
});