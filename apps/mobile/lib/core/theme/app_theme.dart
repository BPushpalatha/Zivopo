import 'package:flutter/material.dart';

class AppTheme {
  static const Color navy = Color(0xFF071A2F);
  static const Color gold = Color(0xFFD4AF37);
  static const Color cream = Color(0xFFF7F3E8);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(seedColor: gold, primary: gold, secondary: navy),
      scaffoldBackgroundColor: cream,
      textTheme: const TextTheme(
        headlineMedium: TextStyle(color: navy, fontWeight: FontWeight.w700),
        bodyMedium: TextStyle(color: navy),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(seedColor: gold, brightness: Brightness.dark),
    );
  }
}
