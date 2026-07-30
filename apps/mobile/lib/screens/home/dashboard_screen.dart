import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Welcome to ZIVOPO', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: const [
                _ServiceChip(label: 'Student Help'),
                _ServiceChip(label: 'Senior Support'),
                _ServiceChip(label: 'Corporate Concierge'),
                _ServiceChip(label: 'Apartment Services'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _ServiceChip extends StatelessWidget {
  final String label;
  const _ServiceChip({required this.label});

  @override
  Widget build(BuildContext context) {
    return Chip(label: Text(label));
  }
}
